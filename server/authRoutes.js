const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { neon } = require('@neondatabase/serverless');
const router = express.Router();

// Function to get database client
async function dbClient() {
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const db = await dbClient();
    const admins = await db`SELECT * FROM admins WHERE email = ${email}`;

    if (admins.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = admins[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        userId: admin.admin_id, 
        email: admin.email 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ 
      message: 'Login successful',
      token,
      user: {
        id: admin.admin_id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// You can add more routes here, such as logout, password reset, etc.

module.exports = router;
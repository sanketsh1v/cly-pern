require('dotenv').config();
const axios = require('axios');

async function createAdmin() {
  const adminData = {
    email: 'admin@example.com',
    password: 'securepassword123'
  };

  try {
    const response = await axios.post('http://localhost:4000/auth/create-admin', adminData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Admin creation response:', response.data);
  } catch (error) {
    console.error('Error creating admin:');
    if (error.response) {
      console.error('Server responded with:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

createAdmin();
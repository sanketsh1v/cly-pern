require('dotenv').config();
const express = require("express");
const { neon } = require('@neondatabase/serverless');
const app = express();
const authRoutes = require('./authRoutes');
const authenticateToken = require('./authMiddleware');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database client connection
async function dbClient() {
    const sql = neon(process.env.DATABASE_URL);
    return sql;
}

// Function to hash passwords
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Use auth routes
app.use('/auth', authRoutes);

// Route to create an admin user
app.post('/auth/create-admin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await dbClient();
    const hashedPassword = await hashPassword(password);
    const newAdmin = await db`
      INSERT INTO admins (email, password_hash)
      VALUES (${email}, ${hashedPassword})
      RETURNING admin_id, email
    `;
    res.json({ status: "Success", admin: newAdmin[0] });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

// Protected admin dashboard route
app.get('/admin-dashboard', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard!' });
});

// Route to fetch Events
app.get("/events", async (req, res) => {
    try {
        const db = await dbClient();
        console.log("route ran")
        const events = await db`SELECT * FROM events`;
        res.json({
            status: "Success",
            events: events
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Quarterly Events
app.get("/quarterlyEvents", async (req, res) => {
    try {
        const db = await dbClient();
        console.log("route ran")
        const events = await db`SELECT * FROM events WHERE event_type = 'quarterly'`;
        res.json({
            status: "Success",
            events: events
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch most recently added Latest Quarterly Event for Home Page
app.get("/latestQuarterlyEvent", async (req, res) => {
    try {
        const db = await dbClient();
        console.log("route ran")
        const latestQuarterlyEvent = await db`SELECT * FROM events WHERE event_type = 'quarterly' ORDER BY created_at DESC LIMIT 1`;
        res.json({
            status: "Success",
            events: latestQuarterlyEvent
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Weekly Events
app.get("/weeklyEvents", async (req, res) => {
    try {
        const db = await dbClient();
        console.log("route ran");
        const events = await db`SELECT * FROM events WHERE event_type = 'weekly'`;
        console.log(events);
        res.json({
            status: "Success",
            events: events
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Training Courses
app.get("/trainingCourses", async (req, res) => {
    try {
        const db = await dbClient();
        console.log("route ran");
        const events = await db`SELECT * FROM events WHERE event_type = 'training'`;
        console.log(events);
        res.json({
            status: "Success",
            events: events
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Speakers
app.get("/Speakers", async (req, res) => {
    try {
        const db = await dbClient();
        const speakers = await db`SELECT * FROM speakers`;
        res.json({
            status: "Success",
            events: speakers
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Payments
app.get("/Payments", async (req, res) => {
    try {
        const db = await dbClient();
        const payments = await db`SELECT * FROM payments`;
        res.json({
            status: "Success",
            events: payments
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Create Event
app.post("/createEvent", async (req, res) => {
    const { event_name, event_date, start_time, end_time, event_location, zoom_link, event_description, event_type, price } = req.body;
    try {
        const db = await dbClient();
        const newEvent = await db`INSERT INTO events (event_name, event_date, start_time, end_time, event_location, zoom_link, event_description, event_type, price)
        VALUES (${event_name}, ${event_date}, ${start_time}, ${end_time}, ${event_location}, ${zoom_link}, ${event_description}, ${event_type}, ${price}) RETURNING *`;
        res.json({ status: "Success", event: newEvent });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Update an existing Event
app.put('/updateEvent/:id', async (req, res) => {
    const { id } = req.params;
    const { event_name, event_date, start_time, end_time, event_location, zoom_link, event_description, event_type, price } = req.body;
    try {
      const db = await dbClient();
      const updatedEvent = await db`
        UPDATE events 
        SET 
          event_name=${event_name}, 
          event_date=${event_date}, 
          start_time=${start_time}, 
          end_time=${end_time}, 
          event_location=${event_location}, 
          zoom_link=${zoom_link}, 
          event_description=${event_description}, 
          event_type=${event_type}, 
          price=${price}
        WHERE event_id=${id}
        RETURNING *`;
      res.json({ status: 'Success', event: updatedEvent });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: error.message });
    }
});
  
// Delete an Event
app.delete("/deleteEvent/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const db = await dbClient();
        await db`DELETE FROM events WHERE event_id=${id}`;
        res.json({ status: "Success", message: `Event with ID ${id} has been deleted.` });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Create a New Speaker
app.post("/Speakers", async (req, res) => {
    const { first_name, last_name, email, speaker_location, expertise } = req.body;
    try {
        const db = await dbClient();
        const newSpeaker = await db`INSERT INTO speakers (first_name, last_name, email, speaker_location, expertise)
        VALUES (${first_name}, ${last_name}, ${email}, ${speaker_location}, ${expertise}) RETURNING *`;
        res.json({ status: "Success", speaker: newSpeaker });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Update an existing Speaker
app.put("/Speakers/:id", async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, speaker_location, expertise } = req.body;
    try {
        const db = await dbClient();
        const updatedSpeaker = await db`UPDATE speakers SET first_name=${first_name}, last_name=${last_name}, email=${email},
        speaker_location=${speaker_location}, expertise=${expertise} WHERE speaker_id=${id} RETURNING *`;
        res.json({ status: "Success", speaker: updatedSpeaker });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Delete a Speaker
app.delete("/Speakers/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const db = await dbClient();
        await db`DELETE FROM speakers WHERE speaker_id=${id}`;
        res.json({ status: "Success", message: `Speaker with ID ${id} has been deleted.` });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Create a new Payment
app.post("/Payments", async (req, res) => {
    const { payment_type, event_registration_id, donation_id, first_name, last_name, email, amount_paid, payment_reference, payment_date } = req.body;
    try {
        const db = await dbClient();
        const newPayment = await db`INSERT INTO payments (payment_type, event_registration_id, donation_id, first_name, last_name, email, amount_paid, payment_reference, payment_date)
        VALUES (${payment_type}, ${event_registration_id}, ${donation_id}, ${first_name}, ${last_name}, ${email}, ${amount_paid}, ${payment_reference}, ${payment_date}) RETURNING *`;
        res.json({ status: "Success", payment: newPayment });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Update an Existing Payment
app.put("/Payments/:id", async (req, res) => {
    const { id } = req.params;
    const { amount_paid, payment_reference } = req.body;
    try {
        const db = await dbClient();
        const updatedPayment = await db`UPDATE payments SET amount_paid=${amount_paid}, payment_reference=${payment_reference}
        WHERE payments_id=${id} RETURNING *`;
        res.json({ status: "Success", payment: updatedPayment });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
//Delete a Payment
app.delete("/Payments/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const db = await dbClient();
        await db`DELETE FROM payments WHERE payments_id=${id}`;
        res.json({ status: "Success", message: `Payment with ID ${id} has been deleted.` });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Creating a New Training Course
app.post("/TrainingCourses", async (req, res) => {
    const { course_name, course_description, duration, instructor, start_date, end_date } = req.body;
    try {
        const db = await dbClient();
        const newCourse = await db`INSERT INTO training_courses (course_name, course_description, duration, instructor, start_date, end_date)
        VALUES (${course_name}, ${course_description}, ${duration}, ${instructor}, ${start_date}, ${end_date}) RETURNING *`;
        res.json({ status: "Success", course: newCourse });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Update an existing Training Course
app.put("/TrainingCourses/:id", async (req, res) => {
    const { id } = req.params;
    const { course_name, course_description, duration, instructor, start_date, end_date } = req.body;
    try {
        const db = await dbClient();
        const updatedCourse = await db`UPDATE training_courses SET course_name=${course_name}, course_description=${course_description},
        duration=${duration}, instructor=${instructor}, start_date=${start_date}, end_date=${end_date} WHERE course_id=${id} RETURNING *`;
        res.json({ status: "Success", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});
 
// Delete a Training Course
app.delete("/TrainingCourses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const db = await dbClient();
        await db`DELETE FROM training_courses WHERE course_id=${id}`;
        res.json({ status: "Success", message: `Training course with ID ${id} has been deleted.` });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.toString()
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});

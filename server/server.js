require('dotenv').config();
const express = require("express");
const { neon } = require('@neondatabase/serverless');
const app = express();
const authRoutes = require('./authRoutes');
const authenticateToken = require('./authMiddleware');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { client: squareClient, locationId } = require('./config/squareConfig');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: '',
    allowedFormats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage: storage });

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

// Route to fetch all Speakers
app.get("/Speakers", async (req, res) => {
    try {
        const db = await dbClient();
        const speakers = await db`SELECT * FROM speakers`; // Fetch all speaker fields, including image_path
        res.json({
            status: "Success",
            events: speakers // Assuming 'events' is used in your frontend to store the speaker data
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
app.post('/createEvent', upload.single('image'), async (req, res) => {
    const { event_name, event_date, start_time, end_time, event_location, zoom_link, event_description, event_type, price } = req.body;

    try {
        // Store the uploaded image's URL in imageUrl
        let imageUrl = null;
        if (req.file && req.file.path) {
            imageUrl = req.file.path;
        }

        // Insert event details along with the image URL into the database
        const db = await dbClient();
        const newEvent = await db`
        INSERT INTO events (event_name, event_date, start_time, end_time, event_location, zoom_link, event_description, event_type, price, image_url)
        VALUES (${event_name}, ${event_date}, ${start_time}, ${end_time}, ${event_location}, ${zoom_link}, ${event_description}, ${event_type}, ${price}, ${imageUrl})
        RETURNING *`;

        res.json({ status: 'Success', event: newEvent });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
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

app.post('/Speakers', upload.single('image'), async (req, res) => {
    const { first_name, last_name, email, speaker_location, expertise } = req.body;

    try {
        // Check if image was uploaded successfully
        let imageUrl = null;
        if (req.file && req.file.path) {
            imageUrl = req.file.path;
        }

        // Insert the speaker details along with the image URL into the database
        const db = await dbClient();
        const newSpeaker = await db`
            INSERT INTO speakers (first_name, last_name, email, speaker_location, expertise, image_path)
            VALUES (${first_name}, ${last_name}, ${email}, ${speaker_location}, ${expertise}, ${imageUrl})
            RETURNING *`;

        // Send a success response with the newly created speaker
        res.json({ status: 'Success', speaker: newSpeaker });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

// Update an existing Speaker (without updating the image)
app.put("/updateSpeaker/:id", async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, speaker_location, expertise } = req.body;

    // Validate the request body to ensure required fields are provided
    if (!first_name || !email || !speaker_location) {
        return res.status(400).json({ error: "Missing required fields: first_name, email, and speaker_location." });
    }

    try {
        const sql = await dbClient();
        const result = await sql`UPDATE speakers
                                 SET first_name = ${first_name}, 
                                     last_name = ${last_name}, 
                                     email = ${email}, 
                                     speaker_location = ${speaker_location}, 
                                     expertise = ${expertise}
                                 WHERE speaker_id = ${id}
                                 RETURNING *`;

        if (result.length === 0) {
            return res.status(404).json({ error: "Speaker not found" });
        }

        res.json(result[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
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

// Route to fetch Donations
app.get("/Donations", async (req, res) => {
    try {
        const db = await dbClient();
        const donations = await db`SELECT * FROM donations`;
        res.json({
            status: "Success",
            events: donations
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to add a new donation
app.post("/Donations", async (req, res) => {
    const { first_name, last_name, email, donation_amount } = req.body;

    // Validate input
    if (!first_name || !last_name || !email || !donation_amount) {
        return res.status(400).json({ status: "Error", message: "Missing required fields" });
    }

    try {
        const db = await dbClient();

        // Insert the new donation without payment_reference
        const newDonation = await db`
            INSERT INTO donations (
                first_name, last_name, email, donation_amount, donation_date
            ) VALUES (
                ${first_name}, ${last_name}, ${email}, ${donation_amount}, NOW()
            )
            RETURNING *`;

        // Send the new donation details in the response
        res.json({
            status: "Success",
            donation: newDonation[0]
        });
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

// Process Square Payment
app.post("/process-payment", async (req, res) => {
    const { 
        sourceId, 
        amount,
        firstName,
        lastName,
        email
    } = req.body;

    try {
        const db = await dbClient();
        
        // Process payment with Square
        const payment = await squareClient.paymentsApi.createPayment({
            sourceId: sourceId,
            idempotencyKey: crypto.randomUUID(),
            amountMoney: {
                amount: parseInt(amount * 100), // Convert dollars to cents
                currency: 'USD'
            },
            buyerEmailAddress: email,
            note: `Donation from ${firstName} ${lastName}`
        });

        // Record payment in database
        const newPayment = await db`
            INSERT INTO payments (
                payment_type,
                first_name,
                last_name,
                email,
                amount_paid,
                payment_reference,
                payment_date
            )
            VALUES (
                'donation',
                ${firstName},
                ${lastName},
                ${email},
                ${amount},
                ${payment.result.payment.id},
                NOW()
            )
            RETURNING *
        `;

        res.json({ 
            status: "Success", 
            payment: payment.result.payment,
            paymentRecord: newPayment[0]
        });

    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ 
            status: "Error", 
            message: error.message || 'Payment processing failed'
        });
    }
});

// Create Square Payment Link
app.post("/create-payment-link", async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            contactNumber,
            amount 
        } = req.body;

        console.log('Received payment request:', req.body);
        console.log('Using location ID:', locationId); // Debug log

        if (!amount) {
            throw new Error('Amount is required');
        }

        if (!locationId) {
            throw new Error('Square location ID is not configured');
        }

        const response = await squareClient.checkoutApi.createPaymentLink({
            quickPay: {
                name: "Calgary Laughter Yoga Payment",
                priceMoney: {
                    amount: parseInt(parseFloat(amount) * 100),
                    currency: 'CAD'
                },
                locationId: locationId
            },
            prePopulatedData: {
                buyerEmail: email,
                buyerFirstName: firstName,
                buyerLastName: lastName,
                ...(contactNumber && { buyerPhoneNumber: contactNumber })
            },
            redirectUrl: `${process.env.CLIENT_URL}/payment-status?status=success`,
            checkoutOptions: {
                redirectUrl: `${process.env.CLIENT_URL}/payment-status?status=success`,
                askForShippingAddress: false,
            }
        });

        console.log('Square API Response:', response);

        if (!response?.result?.paymentLink?.url) {
            throw new Error('Failed to generate payment link');
        }

        res.json({ 
            status: "Success", 
            paymentLink: response.result.paymentLink.url 
        });
    } catch (error) {
        console.error('Payment Link Error:', error);
        res.status(500).json({ 
            status: "Error", 
            message: error.message || 'Failed to create payment link',
            details: error.details || {}
        });
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

app.get('/api/example', (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
  });
  

// const port = process.env.PORT || 4001;
// app.listen(port, () => {
//     console.log(`Server is up and listening on port ${port}`);
// });

const port = process.env.PORT || 4001;

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
  });
}
module.exports = app;
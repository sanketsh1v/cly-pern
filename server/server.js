// const serverless = require("serverless-http");
require('dotenv').config();
const express = require("express");
const { neon } = require('@neondatabase/serverless'); // use require, not import
const app = express();
const morgan = require('morgan')


// Database client connection- traverse
async function dbClient() {
    const sql = neon(process.env.DATABASE_URL);
    return sql;
}

app.use(express.json());
// Route to fetch Weekly Events
app.get("/Events", async (req, res) => {
    try {
        const db = await dbClient();
        console.log("route ran")
        const events = await db`SELECT * FROM events`; // Adjust query based on your data
        res.json({
            status: "Success",
            events: events
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Training Courses
app.get("/getTrainingCourses", async (req, res) => {
    try {
        const db = await dbClient();
        const trainingCourses = await db`SELECT * FROM training_courses`; // Adjust query based on your data
        res.json({
            status: "Success",
            events: trainingCourses
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Speakers
app.get("/getSpeakers", async (req, res) => {
    try {
        const db = await dbClient();
        const speakers = await db`SELECT * FROM speakers`; // Adjust query based on your data
        res.json({
            status: "Success",
            events: speakers
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Quarterly Events
// app.get("/getQuarterlyEvents", async (req, res) => {
//     try {
//         const db = await dbClient();
//         const quarterlyEvents = await db`SELECT * FROM quarterly_events`; // Adjust query based on your data
//         res.json({
//             status: "Success",
//             events: quarterlyEvents
//         });
//     } catch (error) {
//         res.status(500).json({ status: "Error", message: error.message });
//     }
// });

// Route to fetch Payments
app.get("/getPayments", async (req, res) => {
    try {
        const db = await dbClient();
        const payments = await db`SELECT * FROM payments`; // Adjust query based on your data
        res.json({
            status: "Success",
            events: payments
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});
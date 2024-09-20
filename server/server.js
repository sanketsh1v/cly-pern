// const serverless = require("serverless-http");
require('dotenv').config();
const express = require("express");
const { neon } = require('@neondatabase/serverless'); // use require, not import

const app = express();

// Database client connection
async function dbClient() {
    const sql = neon(process.env.DATABASE_URL);
    return sql;
}

// Route to fetch Weekly Events
app.get("/getWeeklyEvents", async (req, res) => {
    try {
        const db = await dbClient();
        const weeklyEvents = await db`SELECT * FROM weekly_events`; // Adjust query based on your data
        res.json({
            status: "Success",
            events: weeklyEvents
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Route to fetch Quarterly Events
app.get("/getQuarterlyEvents", async (req, res) => {
    try {
        const db = await dbClient();
        const quarterlyEvents = await db`SELECT * FROM quarterly_events`; // Adjust query based on your data
        res.json({
            status: "Success",
            events: quarterlyEvents
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});

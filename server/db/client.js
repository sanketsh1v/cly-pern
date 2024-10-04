const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function dbClient() {
    const sql = neon(process.env.DATABASE_URL);
    return sql;
}

module.exports = dbClient;

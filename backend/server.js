const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
    }
});

const PORT = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl: {
        rejectUnauthorized: false,
    },
});

app.listen(PORT, () => {
    console.log('Server running on port 3000')
});
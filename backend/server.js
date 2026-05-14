const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {Pool} = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/stalls", async (req, res) => {
    try {

        const result = await pool.query("SELECT * FROM stalls");

        res.json(result.rows);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Server error" });

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
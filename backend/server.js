const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {Pool} = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLat = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI /180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

}

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
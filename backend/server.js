const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {Pool} = require("pg");

const app = express();

app.use(cors());
app.use(express.json());
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));

//function to calculate distance between user and stalls using user and stall coordinates
function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI /180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

}

// app.get("/", (req, res) => {
//     res.send("API is running");
// });

//api endpoint that queries database and returns nearby stalls within max radius
app.get("/api/stalls", async (req, res) => {
    try {

        const userLat = parseFloat(req.query.lat);
        const userLng = parseFloat(req.query.lng);

        const result = await pool.query("SELECT * FROM stalls");

        const nearbyStalls = result.rows
            .map(stall => {

                const distance = getDistance(
                    userLat,
                    userLng,
                    stall.latitude,
                    stall.longitude
                );

                return {
                    ...stall,
                    distance: distance.toFixed(1)
                };

            })
            .filter(stall => stall.distance <= 10);

        res.json(nearbyStalls);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Server error" });

    }
});

app.get("/api/stalls/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM stalls WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Stall not found" });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/api/stalls/:id/menu", async (req, res) => {
    const { id } = req.params;

    const result = await pool.query(
        `SELECT dish_name, price, image_url
         FROM menu_items
         WHERE stall_id = $1`,
        [id]
    );

    res.json(result.rows);
});

const PORT = process.env.PORT || 3000;

//postgres database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl: {
        rejectUnauthorized: false,
    },
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
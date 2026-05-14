const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {Pool} = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server up and running...")
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
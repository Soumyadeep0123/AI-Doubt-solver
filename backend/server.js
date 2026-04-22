const express = require('express');
const cors =require('cors');
require('dotenv').config();
const askRoutes = require("./routes/askRoute");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/ask", askRoutes);

app.get('/', (req, res) => {
    res.send("API is running...");
});

connectDB();
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
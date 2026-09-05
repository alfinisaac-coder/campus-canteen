const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Canteen API is running");
});

// Food routes
app.use("/api/foods", foodRoutes);
app.use("/api/foods", foodRoutes);

app.get("/api/test-orders", (req, res) => {
    res.send("Order route test is working");
});

app.use("/api/orders", orderRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error);
    });
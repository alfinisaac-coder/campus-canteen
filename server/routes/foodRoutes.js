const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

// GET all food items
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find();

        res.json(foods);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching food items"
        });
    }
});

// POST a new food item
router.post("/", async (req, res) => {
    try {
        const food = new Food(req.body);

        const savedFood = await food.save();

        res.status(201).json(savedFood);
    } catch (error) {
        res.status(500).json({
            message: "Error adding food"
        });
    }
});

module.exports = router;
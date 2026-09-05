const express = require("express");
const Order = require("../models/Order");

const router = express.Router();


// =========================
// TEST ROUTE
// =========================

router.get("/test", (req, res) => {

    res.send("orderRoutes.js is connected");

});


// =========================
// CREATE ORDER
// =========================

router.post("/", async (req, res) => {

    try {

        const order = new Order(req.body);

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    } catch (error) {

        console.log("Order creation error:", error);

        res.status(500).json({
            message: "Error placing order"
        });

    }

});


// =========================
// GET CUSTOMER ORDERS
// =========================

router.get("/customer", async (req, res) => {

    try {

        const email = req.query.email;


        if (!email) {

            return res.status(400).json({
                message: "Email is required"
            });

        }


        const orders = await Order.find({
            customerEmail: email
        }).sort({
            orderDate: -1
        });


        res.json(orders);

    } catch (error) {

        console.log(
            "Customer orders error:",
            error
        );

        res.status(500).json({
            message: "Error fetching customer orders"
        });

    }

});


// =========================
// GET ALL ORDERS
// =========================

router.get("", async (req, res) => {

    try {

        const orders = await Order.find().sort({
            orderDate: -1
        });

        res.json(orders);

    } catch (error) {

        console.log(
            "Orders fetch error:",
            error
        );

        res.status(500).json({
            message: "Error fetching orders"
        });

    }

});


// =========================
// UPDATE ORDER STATUS
// =========================

router.put("/:id", async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true
            }
        );


        res.json(order);

    } catch (error) {

        console.log(
            "Order status update error:",
            error
        );

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;
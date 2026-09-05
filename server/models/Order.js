const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },

    customerEmail: {
        type: String,
        required: true
    },

    items: [
        {
            foodId: String,
            foodName: String,
            price: Number,
            quantity: Number
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    orderDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Order", orderSchema);
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            name_en: String,
            name_ar: String,
            price: Number,
            quantity: Number,
            image: String,
        },
    ],

    totalPrice: {
        type: Number,
        required: true,
    },

    paymentMethod: {
        type: String,
        enum: ["Cash on Delivery", "Online Payment"],
        required: true,
    },

    status: {
        type: String,
        enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"],
        default: "Pending",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Order", orderSchema);
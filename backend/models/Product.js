const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    name_en: {
        type: String,
        required: true,
    },

    name_ar: {
        type: String,
        required: true,
    },

    description_en: String,

    description_ar: String,

    price: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        default: "Food",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const AddToCart = mongoose.Schema({
    guitar_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guitar",
        required: true,
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("AddToCart", AddToCart);
const mongoose = require("mongoose");

const Wishlist = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    },
    guitar_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Guitar'
    }
});

module.exports = mongoose.model('Wishlist', Wishlist);
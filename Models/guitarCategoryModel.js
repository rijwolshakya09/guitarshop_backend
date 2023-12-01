const mongoose = require("mongoose");

const GuitarCategory = new mongoose.Schema({
    category_name : {
        type : String,
        required : true,
    },
    category_desc : {
        type : String,
        required : true,
    },
    category_pic : {
        type : String,
        required : true,
    },
})

module.exports = mongoose.model('GuitarCategory', GuitarCategory);
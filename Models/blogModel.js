const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
    blog_title: {
        type: String,
        required : true,
    },
    blog_image:{
        type: String,
        required: true,
    },
    blog_description:{
        type: String,
        required: true,
    },
    blog_rich_description:{
        type: String,
        required: true,
    },
    isFeatured:{
        type: Boolean,
        default: false,
    },
    dateCreated:{
        type: String,
        required: true,
    },
    blog_SKU:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Blog', Blog);
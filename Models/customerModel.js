const mongoose = require("mongoose");

//User Model Collection Create
const Customer = new mongoose.Schema({
    full_name : {
        type : String,
        required : true,
    },
    address : {
        type : String
    },
    contact_no : {
        type : String,
        required : true
    },
    gender : {
        type : String
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profile_pic : {
        type : String
    },
    userType:{
        type: String,
        
    }
});
module.exports = mongoose.model('Customer', Customer);
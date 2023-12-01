const mongoose = require("mongoose");

const Order = mongoose.Schema({
    order_item: [{
        guitar_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Guitar",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    order_status: {
        type: String,
    },
    payment_method: {
        type: String,
        required: true,
    },
    payment_status: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    contact_no: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", Order);


// const mongoose = require("mongoose");

// const Order = mongoose.Schema({
//     orderItems: [{
//         guitar_id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Guitar",
//         },
//         quantity: {
//             type: Number,
//         },
//     }],
//     user_id : {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Customer",
//     },
//     shippingAddress:{
//       address: {type: String, required: true},
//       city: { type: String, required: true},
//       postalCode: { type:String, required: true},
//       country: { type: String, required: true},
//     },
//     paymentMethod: {
//         type: String,
//         required: true,
//         default: "Cash On Delivery",
//     },
//     paymentResult: {
//         id: {type:String},
//         status:{type:String},
//         update_time:{type:String},
//         email_address: {type:String},
//     },
//     taxPrice:{
//         type:Number,
//         required: true,
//         default: 0.0,
//     },
//     shippingPrice:{
//         type:Number,
//         required: true,
//         default: 0.0,
//     },
//     totalPrice: {
//         type: Number,
//         required: true,
//         default: 0.0,
//     },
//     isPaid:{
//         type: Boolean,
//         required: true,
//         default: false,
//     },
//     paidAt:{
//         type: Date,
//     },
//     isDelivered:{
//         type:Boolean,
//         required: true,
//         default: false,
//     },
//     deliveredAt:{
//         type:Date,
//     },
// });

// module.exports = mongoose.model("Order", Order);

// export default Order;
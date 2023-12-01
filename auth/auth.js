const jwt = require("jsonwebtoken");
const customer = require("../Models/customerModel");
const admin = require("../Models/adminModel");

// This Is Guard For Customer...
module.exports.customerGuard = (req,res,next)=>{
try{
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token ,"guitarshopuser");
    console.log(data);
    customer.findOne({_id : data.customerId})
    .then((cdata) =>{
        req.customerInfo = cdata;
        next();
    })
    .catch((e) =>{
        res.json({msg: "Invalid Token"})
    })
}
catch(e){
    res.json({msg : "Invalid Token"})
}


};

// This Is Guard For Customer...
module.exports.adminGuard = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token ,"guitarshopuser");
        console.log(data);
        admin.findOne({_id : data.adminId})
        .then((adata) =>{
            req.adminInfo = adata;
            next();
        })
        .catch((e) =>{
            res.json({msg: "Invalid Token"})
        })
    }
    catch(e){
        res.json({msg : "Invalid Token"})
    }
    
    
    };
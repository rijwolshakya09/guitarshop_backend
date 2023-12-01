const bcryptjs = require("bcryptjs");
const express = require("express");
const app = express();
const router = new express.Router();
const jwt = require("jsonwebtoken");
const upload = require("../fileupload/fileupload");

//Importing Model
const Customer = require("../Models/customerModel");
const auth = require("../auth/auth");

// For Registering Process Customer
router.post("/customer/register", (req, res) => {
  const username = req.body.username;
  Customer.findOne({ username: username })
    .then((cust_data) => {
      if (cust_data != null) {
        res.json({ msg: "Username Already Exists", success : 'exists' });
        return;
      }
      const full_name = req.body.full_name;
      const address = req.body.address;
      const contact_no = req.body.contact_no;
      const gender = req.body.gender;
      const email = req.body.email;
      const password = req.body.password;
     // const profile_pic = req.file.profile_pic;

      bcryptjs.hash(password, 10, (e, hashed_pw) => {
        const data = new Customer({
          full_name: full_name,
          address: address,
          contact_no: contact_no,
          gender: gender,
          username: username,
          email: email,
          password: hashed_pw,
          userType: 'customer'
        //  profile_pic: profile_pic,
        });
        data
          .save()
          .then(() => {
            res.json({ msg: "Customer Registered Successfully", success : true });
          })
          .catch((e) => {
            res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
          });
      });
    })
    .catch();
});

//For Login Process Admin
router.post("/customer/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Customer.findOne({ username: username })
    .then((cust_data) => {
      if (cust_data == null) {
        res.json({ msg: "Invalid Credentials!!!" });
        return;
      }
      bcryptjs.compare(password, cust_data.password, (e, result) => {
        if (result == false) {
          res.json({ msg: "Invalid Credentials!!!" });
          return;
        }
        //It creates token for the logged in user...
        //The token stores the logged in user`s ID...
        const token = jwt.sign({ customerId: cust_data._id }, "guitarshopuser");
        res.status(201).json({ token: token, userType: cust_data.userType });
      });
    })
    .catch();
});


// Dashboard router for customer
router.get("/customer/dashboard", auth.customerGuard, (req, res) => {
  res.status(201).json({
    success: true,
    data : {
      _id: req.customerInfo._id,
      full_name: req.customerInfo.full_name,
      address: req.customerInfo.address,
      contact_no: req.customerInfo.contact_no,
      gender: req.customerInfo.gender,
      username: req.customerInfo.username,
      email: req.customerInfo.email,
      profile_pic: req.customerInfo.profile_pic,
    }
  });
});


//This is for testing only, will delete this later...
router.delete("/comment/delete", auth.customerGuard, (req, res) => {
  res.json({ msg: "Deleted" });
});


//Customer Update Profile Details
router.put(
  "/customer/update",
  auth.customerGuard,
  (req, res) => {
    console.log(req.body)
    Customer.updateOne(
      { _id: req.customerInfo._id },
      {
        full_name: req.body.full_name,
        address: req.body.address,
        contact_no: req.body.contact_no,
        gender: req.body.gender,
        email: req.body.email,
      }
    )
      .then(() => {
        res.status(201).json({ msg: "Profile Updated Successfully", success : true });
      })
      .catch((e) => {
        res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
      });
  }
);

//Customer Update Profile Picture
router.put(
  "/customer/update_pic",
  auth.customerGuard,
  upload.single("profile_pic"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid File Format" });
    }
    Customer.updateOne(
      { _id: req.customerInfo._id },
      {
        profile_pic: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "Profile Picture Updated Successfully", success:true });
      })
      .catch((e) => {
        res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
      });
  }
);

//Customer Delete
router.delete("/customer/delete/:id", auth.customerGuard, (req, res) => {
  
    Customer.deleteOne(
        { _id: req.params.id },
      )
        .then(() => {
          res.json({ msg: "Customer Deleted Successfully" });
        })
        .catch((e) => {
          res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
  });

  router.put('/customer/update/get', auth.customerGuard, upload.single('profile_pic'), (req,res)=>{

    const full_name= req.body.full_name;
    const address= req.body.address;
    const contact_no= req.body.contact_no;
    const gender= req.body.gender;
    const username=req.body.username;
    const email= req.body.email;
    const profile_pic= req.body.profile_pic;
    console.log(full_name);
    console.log(address);
    console.log(contact_no);
    console.log(gender);
    console.log(username);
    console.log(email);
    
    // const picture = req.file.filename;
    if(req.file == undefined){
        console.log("Undefined data ");
        Customer.updateOne(
            {_id : req.customerInfo._id}, 
            {
                full_name :full_name,
                address: address, 
                contact_no :contact_no,
                gender: gender, 
                username : username,
                email : email,
            }
        )
        .then(()=>{
            res.json({msg : "Profile Updated Successfully"})
        })
        .catch((e)=>{
            res.json({msg : "Something Went Wrong Error!!!"})
        })
    } else{
      Customer.updateOne(
            {_id : req.customerInfo._id}, 
            {
              full_name :full_name,
              
                address :address,
                contact_no: contact_no, 
                gender:gender, 
                username : username,
                email : email,
                profile_pic : req.file.filename,
            }
        )
        .then(()=>{
            res.json({msg : "Profile Picture Updated Successfully"})
        })
        .catch((e)=>{
            res.json({msg : "Something Went Wrong!!!"})
        }) 
    }
})

module.exports = router;

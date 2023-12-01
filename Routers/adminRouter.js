const bcryptjs = require("bcryptjs");
const express = require("express");
const app = express();
const router = new express.Router();
const jwt = require("jsonwebtoken");

//Importing Model
const Admin = require("../Models/adminModel");
const auth = require("../auth/auth");

// For Registering Process Admin
router.post("/admin/register", (req, res) => {
  const username = req.body.username;
  Admin.findOne({ username: username })
    .then((adm_data) => {
      if (adm_data != null) {
        res.json({ msg: "Username Already Exists" });
        return;
      }
      const full_name = req.body.full_name;
      const address = req.body.address;
      const contact_no = req.body.contact_no;
      const gender = req.body.gender;
      const email = req.body.email;
      const password = req.body.password;

      bcryptjs.hash(password, 10, (e, hashed_pw) => {
        const data = new Admin({
          full_name: full_name,
          address: address,
          contact_no: contact_no,
          gender: gender,
          username: username,
          email: email,
          password: hashed_pw,
        });
        data
          .save()
          .then(() => {
            res.json({ msg: "Admin Added Successfully" });
          })
          .catch((e) => {
            res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
          });
      });
    })
    .catch();
});

//For Login Process Admin
router.post("/admin/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.findOne({ username: username })
    .then((adm_data) => {
      if (adm_data == null) {
        res.json({ msg: "Invalid Credentials!!!" });
        return;
      }
      bcryptjs.compare(password, adm_data.password, (e, result) => {
        if (result == false) {
          res.json({ msg: "Invalid Credentials!!!" });
          return;
        }
        //It creates token for the logged in user...
        //The token stores the logged in user`s ID...
        const token = jwt.sign({ adminId: adm_data._id }, "guitarshopuser");
        res.json({ token: token });
      });
    })
    .catch();
});

//For Updating Profile Process Admin
router.put("/admin/update", auth.adminGuard, (req, res) => {});

// Dashboard router for admin
router.get("/admin/dashboard", auth.adminGuard, (req, res) => {
  //console.log(req.adminInfo.full_name);
  // res.json(req.adminInfo)
  res.json({
    full_name: req.adminInfo.full_name,
    address: req.adminInfo.address,
    contact_no: req.adminInfo.contact_no,
    gender: req.adminInfo.gender,
    username: req.adminInfo.username,
    email: req.adminInfo.email,
  });
});
// Dashboard update route
router.put("/admin/update", auth.adminGuard, (req, res) => {
  const id = req.adminInfo._id;
  const username = req.body.username;
  const password = req.body.password;
  const full_name = req.body.full_name;
  const email = req.body.email;
  Admin.updateOne(
    { _id: id },
    {
      username: username,
      full_name: full_name,
      email: email,
      password: password,
    }
  )
    .then(() => {
      res.json({ msg: "data updated" });
    })
    .catch();
});

module.exports = router;

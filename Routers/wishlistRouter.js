const express = require("express");
const router = new express.Router();
const upload = require("../fileupload/fileupload");

//Importing Model
const Wishlist = require("../Models/wishlistModel");
const auth = require("../auth/auth");

//Route To Insert Guitar To Wishlist By Customer
router.post("/wishlist/insert/", auth.customerGuard, (req, res) => {
  console.log(req.res);
  const user_id = req.customerInfo._id;
  const guitar_id = req.body.guitar_id;

  const data = new Wishlist({
    user_id: user_id,
    guitar_id: guitar_id,
  });
  data
    .save()
    .then(() => {
      res
        .status(201)
        .json({ msg: "Guitar Added To Wishlist Successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

//Wishlist Get
router.get("/wishlist/get", auth.customerGuard, (req, res) => {
  Wishlist.find({ user_id: req.customerInfo._id })
    .populate("guitar_id")
    .then((wishlist) => {
      if (wishlist != null) {
        res.status(201).json({
          success: true,
          data: wishlist,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

//Wishlist Delete
router.delete("/wishlist/delete/:id", auth.customerGuard, (req, res) => {
  Wishlist.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({
        msg: "Guitar Deleted From Wishlist Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

module.exports = router;

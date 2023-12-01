const express = require("express");
const AddToCart = require("../Models/addtocartModel");
const router = new express.Router();
const auth = require("../auth/auth");

router.post("/cart/insert", auth.customerGuard, (req, res) => {
  const data = AddToCart({
    guitar_id: req.body.guitar_id,
    user_id: req.customerInfo._id,
    quantity: req.body.quantity,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        msg: "Guitar Added To Cart Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

//Cart Get
router.get("/cart/get", auth.customerGuard, (req, res) => {
  AddToCart.find({ user_id: req.customerInfo._id })
    .populate("guitar_id")
    .then((cart) => {
      if (cart != null) {
        res.status(201).json({
          success: true,
          data: cart,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

//Cart Delete
router.delete("/cart/delete/:cart_id", auth.customerGuard, (req, res) => {
  console.log(req.params.cart_id);
  AddToCart.deleteOne({ _id: req.params.cart_id })
    .then(() => {
      res.status(201).json({ msg: "Cart Deleted Successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

module.exports = router;

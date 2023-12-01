const express = require("express");

const router = new express.Router();
const auth = require("../auth/auth");
const Review = require("../Models/reviewModel");

//Post Comment
router.post("/review/insert", auth.customerGuard, (req, res) => {
  const data = Review({
    guitar_id: req.body.guitar_id,
    user_id: req.customerInfo._id,
    comment: req.body.comment,
    rating: req.body.rating,
  });
  data
    .save()
    .then(() => {
      res.status(200).json({ msg: "Review Added Successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

//Update Comment
router.put("/review/update", auth.customerGuard, (req, res) => {
  Review.updateOne(
    { _id: req.body.review_id },
    {
      guitar_id: req.body.guitar_id,
      user_id: req.customerInfo._id,
      comment: req.body.comment,
      rating: req.body.rating,
    }
  )
    .then(() => {
      res.json({ msg: "Review Updated Successfully", success: true });
    })
    .catch((e) => {
      res.json({
        msg: "Something Went Wrong, Please Try Again!!!",
        success: false,
      });
    });
});

//Review Delete
router.delete("/review/delete/:review_id", auth.customerGuard, (req, res) => {
  console.log(req.params.review_id);
  Review.deleteOne({ _id: req.params.review_id })
    .then(() => {
      res.json({ msg: "Guitar Deleted Successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

//Review Get
router.get("/review/get/:guitar_id", (req, res) => {
  Review.find({guitar_id: req.params.guitar_id})
    .populate("user_id")
    .then((review) => {
      if (review != null) {
        res.status(201).json({
          success: true,
          data: review,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

// router.get("/review/getSinglereview/:review_id", (req, res) => {
//   Review.findOne({ _id: req.params.review_id })
//     .populate("guitar_category")
//     .then((data) => {
//       res.status(201).json({
//         success: true,
//         data: data,
//       });
//     })

//     .catch((e) => {
//       res.json({
//         msg: e,
//       });
//     });
// });


module.exports = router;
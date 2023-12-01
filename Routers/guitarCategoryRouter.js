const express = require("express");
const router = new express.Router();
const upload = require("../fileupload/fileupload");

//Importing Model
// const GuitarCategory = require("../Models/guitarCategoryModel");
const auth = require("../auth/auth");
const guitarCategoryModel = require("../Models/guitarCategoryModel");

//Route To Insert Guitar Category By Admin
router.post(
  "/guitarcategory/insert",
  auth.adminGuard,
  upload.single("category_pic"),
  (req, res) => {
    console.log(req.file);
    const category_name = req.body.category_name;
    const category_desc = req.body.category_desc;
    const category_pic = req.file.filename;
    // const userID = req.adminInfo._id;

    const data = new guitarCategoryModel({
      category_name: category_name,
      category_desc: category_desc,
      category_pic: category_pic,
      // userId : userId,
    });
    data
      .save()
      .then(() => {
        res.json({ msg: "Guitar Category Added Successfully", success : true });
      })
      .catch((e) => {
        res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
      });
  }
);

//Guitar Category Update
router.put(
  "/guitarcategory/update",
  auth.adminGuard,
  upload.single("category_pic"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid File Format" });
    }
    guitarCategoryModel.updateOne(
      { _id: req.body._id },
      {
        category_name: req.body.category_name,
        category_desc: req.body.category_desc,
        category_pic: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "Guitar Category Updated Successfully", success : true});
      })
      .catch((e) => {
        res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
      });
  }
);

//Update Both
router.put(
  "/guitarcategory/updateboth/:category_id",
  auth.customerGuard,
  upload.single("category_pic"),
  (req, res) => {
    const category_name = req.body.category_name;
    const category_desc = req.body.category_desc;
    const id = req.params.category_id;

    // const picture = req.file.filename;
    if (req.file == undefined) {
      guitarCategoryModel.updateOne(
        { _id: id },
        {
          category_name: category_name,
          category_desc: category_desc,
        }
      )
        .then(() => {
          res.json({ msg: "Guitar Category Updated Successfully", success: true });
        })
        .catch((e) => {
          res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    } else {
      guitarCategoryModel
        .updateOne(
          { _id: id },
          {
            category_name: category_name,
            category_desc: category_desc,
            category_pic: req.file.filename,
          }
        )
        .then(() => {
          res.json({ msg: "Guitar Category Updated Successfully", success: true });
        })
        .catch((e) => {
          res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    }
  }
);

//Category Get
router.get("/guitarcategory/get", (req, res) => {
  guitarCategoryModel.find()

    .then((guitarcategory) => {
      if (guitarcategory != null) {
        res.status(201).json({
          success: true,
          data: guitarcategory,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/guitarcategory/getSingleguitarcategory/:category_id", (req, res) => {
  // console.log(req.params.category_id)
  guitarCategoryModel.findOne({ _id: req.params.category_id })
    .then((data) => {
      res.json({ data: data });
    })

    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

//Guitar Delete
router.delete("/guitarcategory/delete/:id", auth.adminGuard, (req, res) => {
  guitarCategoryModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ msg: "Guitar Category Deleted Successfully" });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

module.exports = router;

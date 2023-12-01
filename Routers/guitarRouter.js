const express = require("express");
const router = new express.Router();
const Guitar = require("../Models/guitarModel");
const auth = require("../auth/auth");
const upload = require("../fileupload/fileupload");
const guitarCategoryModel = require("../Models/guitarCategoryModel");

//Route To Insert Guitar By Admin
router.post(
  "/guitar/insert",
  auth.adminGuard,
  upload.single("guitar_image"),
  (req, res) => {
    console.log(req.file);
    const guitar_name = req.body.guitar_name;
    const guitar_rich_name = req.body.guitar_rich_name;
    const guitar_price = req.body.guitar_price;
    const guitar_desc = req.body.guitar_desc;
    const guitar_image = req.file.filename;
    const guitar_category = req.body.guitar_category;
    const guitar_sku = req.body.guitar_sku;
    const isFeatured = req.body.isFeatured;
    // const userID = req.adminInfo._id;

    const data = new Guitar({
      guitar_name: guitar_name,
      guitar_rich_name: guitar_rich_name,
      guitar_price: guitar_price,
      guitar_desc: guitar_desc,
      guitar_image: guitar_image,
      guitar_category: guitar_category,
      guitar_sku: guitar_sku,
      isFeatured: isFeatured,
      // userId : userId,
    });
    const category = guitarCategoryModel.findById(req.body.guitar_category);
    if (!category) {
      return res.status(400).send("Invalid category");
    }
    data
      .save()
      .then(() => {
        res.json({ msg: "Guitar Added Successfully", success: true });
      })
      .catch((e) => {
        res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
      });
  }
);

//Guitar Update Details
router.put("/guitar/update", auth.adminGuard, (req, res) => {
  Guitar.updateOne(
    { _id: req.body.guitar_id },
    {
      guitar_name: req.body.guitar_name,
      guitar_rich_name: req.body.guitar_rich_name,
      guitar_price: req.body.guitar_price,
      guitar_desc: req.body.guitar_desc,
      guitar_category: req.body.guitar_category,
      guitar_sku: req.body.guitar_sku,
      isFeatured: req.body.isFeatured,
    }
  )
    .then(() => {
      res.json({ msg: "Guitar Details Updated Successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" , success: false});
    });
});

//Guitar Update Picture
router.put(
  "/guitar/update_pic",
  auth.adminGuard,
  upload.single("guitar_image"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid File Format" });
    }
    Guitar.updateOne(
      { _id: req.body._id },
      {
        guitar_image: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "Guitar Picture Updated Successfully", success: true });
      })
      .catch((e) => {
        res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
      });
  }
);

//Update Both
router.put(
  "/guitar/updateboth/:guitar_id",
  auth.customerGuard,
  upload.single("guitar_image"),
  (req, res) => {
    const guitar_name = req.body.guitar_name;
    const guitar_rich_name = req.body.guitar_rich_name;
    const guitar_price = req.body.guitar_price;
    const guitar_desc = req.body.guitar_desc;
    const guitar_category = req.body.guitar_category;
    const guitar_SKU = req.body.guitar_SKU;
    const isFeatured = req.body.isFeatured;
    const id = req.params.guitar_id;

    // const picture = req.file.filename;
    if (req.file == undefined) {
      Guitar.updateOne(
        { _id: id },
        {
          guitar_name: guitar_name,
          guitar_rich_name: guitar_rich_name,
          guitar_price: guitar_price,
          guitar_desc: guitar_desc,
          guitar_category: guitar_category,
          guitar_SKU: guitar_SKU,
          isFeatured: isFeatured,
        }
      )
        .then(() => {
          res.json({ msg: "Guitar Updated Successfully", success: true });
        })
        .catch((e) => {
          res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    } else {
      Guitar
        .updateOne(
          { _id: id },
          {
            guitar_name: guitar_name,
            guitar_rich_name: guitar_rich_name,
            guitar_price: guitar_price,
            guitar_desc: guitar_desc,
            guitar_category: guitar_category,
            guitar_image: req.file.filename,
            guitar_SKU: guitar_SKU,
            isFeatured: isFeatured,
          }
        )
        .then(() => {
          res.json({ msg: "Guitar Updated Successfully", success: true });
        })
        .catch((e) => {
          res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    }
  }
);

//Guitar Delete
router.delete("/guitar/delete/:guitar_id", auth.adminGuard, (req, res) => {
  console.log(req.params.guitar_id);
  Guitar.deleteOne({ _id: req.params.guitar_id })
    .then(() => {
      res.json({ msg: "Guitar Deleted Successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

//Guitar Get
router.get("/guitar/get", (req, res) => {
  Guitar.find()
    .populate("guitar_category")
    .then((guitar) => {
      if (guitar != null) {
        res.status(201).json({
          success: true,
          data: guitar,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/guitar/getSingleguitar/:guitar_id", (req, res) => {
  Guitar
    .findOne({ _id: req.params.guitar_id })
    .populate("guitar_category")
    .then((data) => {
      res.status(201).json({ 
        success: true,
        data: data });
    })

    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

module.exports = router;

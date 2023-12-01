const express = require("express");
const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../fileupload/fileupload");
const Blog = require("../Models/blogModel");

//Route To Insert Blog By Admin
router.post(
  "/blog/insert",
  auth.adminGuard,
  upload.single("blog_image"),
  (req, res) => {
    console.log(req.file);
    const blog_title = req.body.blog_title;
    const blog_image = req.file.filename;
    const blog_description = req.body.blog_description;
    const blog_rich_description = req.body.blog_rich_description;
    const isFeatured = req.body.isFeatured;
    const dateCreated = req.body.dateCreated;
    const blog_SKU = req.body.blog_SKU;
    // const userID = req.adminInfo._id;

    const data = new Blog({
      blog_title: blog_title,
      blog_image: blog_image,
      blog_description: blog_description,
      blog_rich_description: blog_rich_description,
      isFeatured: isFeatured,
      dateCreated: dateCreated,
      blog_SKU: blog_SKU,
      // userId : userId,
    });
    data
      .save()
      .then(() => {
        res.json({ msg: "Blog Added Successfully", success: true });
      })
      .catch((e) => {
        res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
      });
  }
);

//Blog Details Update
router.put("/blog/update", auth.adminGuard, (req, res) => {
  Blog.updateOne(
    { _id: req.body.blog_id },
    {
      blog_title: req.body.blog_title,
      blog_description: req.body.blog_description,
      blog_rich_description: req.body.blog_rich_description,
      isFeatured: req.body.isFeatured,
      dateCreated: req.body.dateCreated,
      blog_SKU: req.body.blog_SKU,
    }
  )
    .then(() => {
      res.json({
        msg: "Blog Updated Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: "Something Went Wrong, Please Try Again!!!",
        success: false,
      });
    });
});

//Blog Update Picture
router.put(
  "/blog/update_pic",
  auth.adminGuard,
  upload.single("blog_image"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid File Format" });
    }
    Blog.updateOne(
      { _id: req.body._id },
      {
        blog_image: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "Blog Picture Updated Successfully", success: true });
      })
      .catch((e) => {
        res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
      });
  }
);

//Update Both
router.put(
  "/blog/updateboth/:blog_id",
  auth.customerGuard,
  upload.single("blog_image"),
  (req, res) => {
    const blog_title = req.body.blog_title;
    // const blog_image = req.file.filename;
    const blog_description = req.body.blog_description;
    const blog_rich_description = req.body.blog_rich_description;
    const isFeatured = req.body.isFeatured;
    const dateCreated = req.body.dateCreated;
    const blog_SKU = req.body.blog_SKU;
    const id = req.params.blog_id;

    // const picture = req.file.filename;
    if (req.file == undefined) {
      Blog.updateOne(
        { _id: id },
        {
          blog_title: blog_title,
          blog_description: blog_description,
          blog_rich_description: blog_rich_description,
          isFeatured: isFeatured,
          dateCreated: dateCreated,
          blog_SKU: blog_SKU,
        }
      )
        .then(() => {
          res.json({ msg: "Blog Updated Successfully", success: true });
        })
        .catch((e) => {
          res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    } else {
      Blog
        .updateOne(
          { _id: id },
          {
            blog_title: blog_title,
            blog_image: req.file.filename,
            blog_description: blog_description,
            blog_rich_description: blog_rich_description,
            isFeatured: isFeatured,
            dateCreated: dateCreated,
            blog_SKU: blog_SKU,
          }
        )
        .then(() => {
          res.json({ msg: "Blog Updated Successfully", success: true });
        })
        .catch((e) => {
          res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    }
  }
);

//Blog Delete
router.delete("/blog/delete/:blog_id", auth.adminGuard, (req, res) => {
  console.log(req.params.blog_id);
  Blog.deleteOne({ _id: req.params.blog_id })
    .then(() => {
      res.json({ msg: "Blog Deleted Successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

//Blog Get
router.get("/blog/get", (req, res) => {
  Blog.find()

    .then((blog) => {
      if (blog != null) {
        res.status(201).json({
          success: true,
          data: blog,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/blog/getSingleBlog/:blog_id", (req, res) => {
  Blog.findOne({ _id: req.params.blog_id })
    .then((data) => {
      res.status(201).json({
        success: true,
        data: data,
      });
    })

    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

module.exports = router;

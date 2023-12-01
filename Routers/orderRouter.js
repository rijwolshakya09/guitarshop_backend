const express = require("express");
const Order = require("../Models/orderModel");
const Cart = require("../Models/addtocartModel");
const router = new express.Router();
const auth = require("../auth/auth");

router.post("/order/insert", auth.customerGuard, (req, res) => {
  const data = Order({
    order_item: req.body.order_item.map((x) => ({ ...x })),
    user_id: req.customerInfo._id,
    total_price: req.body.total_price,
    order_status: "Requested",
    payment_method: req.body.payment_method,
    payment_status: req.body.payment_status,
    address: req.body.address,
    contact_no: req.body.contact_no,
  });
  data
    .save()
    .then(() => {
      Cart.deleteMany({
        user_id: req.customerInfo._id,
      })
        .then()
        .catch((e) => {
          res.json({
            msg: e,
          });
        });
      res.status(201).json({
        msg: "Order Made Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.put("/order/cancel", auth.customerGuard, (req, res) => {
  Order.updateOne(
    {
      _id: req.body.id,
    },
    {
      order_status: "Cancelled",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Order Cancelled Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.put("/order/accept", auth.customerGuard, (req, res) => {
  Order.updateOne(
    {
      _id: req.body.id,
    },
    {
      order_status: "On the Way",
    }
  )
    .then(() => {
      res.json({
        msg: "Order Accepted Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.put("/order/delivered", auth.customerGuard, (req, res) => {
  Order.updateOne(
    {
      _id: req.body.id,
    },
    {
      order_status: "Delivered",
    }
  )
    .then(() => {
      res.json({
        msg: "Order Delivered Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.put("/order/reject", auth.customerGuard, (req, res) => {
  Order.updateOne(
    {
      _id: req.body.id,
    },
    {
      order_status: "Rejected",
    }
  )
    .then(() => {
      res.json({
        msg: "Order Rejected Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/order/get", auth.customerGuard, (req, res) => {
  Order.find()
    .sort({
      createdAt: "desc",
    })
    .populate({
      path: "order_item",
      populate: {
        path: "guitar_id",
      },
    })
    .then((order) => {
      res.status(201).json({
        data: order,
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/order/getrequested", auth.customerGuard, (req, res) => {
  Order.find({
    order_status: "Requested",
  })
    .sort({
      createdAt: "desc",
    })
    .populate({
      path: "order_item",
      populate: {
        path: "guitar_id",
      },
    })
    .then((order) => {
      res.status(201).json({
        success: true,
        data: order,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/order/getUserOrder", auth.customerGuard, (req, res) => {
  Order.find({
    user_id: req.customerInfo._id,
  })
    .sort({
      createdAt: "desc",
    })
    .populate({
      path: "order_item",
      populate: {
        path: "guitar_id",
      },
    })
    .then((order) => {
      res.status(201).json({
        success: true,
        data: order,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.delete("/order/delete/:order_id", auth.adminGuard, (req, res) => {
  Order.deleteOne(
    {
      _id: req.params.order_id,
    },
    { order_status: "Cancelled" }
  )
    .then(
      res.json({
        msg: "Order Deleted Successfully",
        success: true,
      })
    )
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

module.exports = router;

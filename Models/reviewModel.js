const mongoose = require("mongoose");

const Review = new mongoose.Schema(
  {
    guitar_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guitar",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", Review);
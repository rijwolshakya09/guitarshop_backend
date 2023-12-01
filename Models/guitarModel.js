const mongoose = require("mongoose");

const Guitar = new mongoose.Schema({
  guitar_name: {
    type: String,
    required: true,
  },
  guitar_rich_name: {
    type: String,
  },
  guitar_price: {
    type: Number,
    required: true,
  },
  guitar_desc: {
    type: String,
    required: true,
  },
  guitar_image: {
    type: String,
    required: true,
  },
  guitar_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GuitarCategory", // this will take Category id not all object
    required: true,
  },
  guitar_sku: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Guitar", Guitar);

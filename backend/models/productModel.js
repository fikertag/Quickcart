const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    moreimages: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    slugs: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);

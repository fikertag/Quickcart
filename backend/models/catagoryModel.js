const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const catagorySchema = new Schema(
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
    parent: {
      type: String,
    },
    slugs: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("catagory", catagorySchema);

require("dotenv").config();
const mongoose = require("mongoose");
const catagory = require("../models/catagoryModel");
const cloudinary = require("cloudinary").v2;

// get All Products checked
const getAllCatagory = async (req, res) => {
  try {
    const catagorys = await catagory.find();
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single product checked
const getSingleCatagory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid product ID");
    }
    const catagorys = await catagory.findById(id);
    if (!catagorys) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create Catagory checked
const createCatagory = async (req, res) => {
  try {
    const { name, description, parent, slugs, count, isActive } = req.body;
    cloudinary.config({
      cloud_name: "dxanwjjcg",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const results = await cloudinary.uploader.upload("./image/headphone.png");
    const url = cloudinary.url(results.public_id);
    const catagorys = await catagory.create({
      name: name,
      description: description,
      parent: parent,
      slugs: slugs,
      count: count,
      isActive: isActive,
      image: url,
    });
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// delete Catagory checked
const deleteCatagory = async (req, res) => {
  try {
    const { id } = req.params;
    const catagorys = await catagory.findByIdAndDelete(id);
    if (!catagorys) {
      return res.status(404).json({ error: "no such product" });
    }
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update Catagory checked
const updateCatagory = async (req, res) => {
  try {
    const { name, description, parent, slugs, count, isActive } = req.body;
    cloudinary.config({
      cloud_name: "dxanwjjcg",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const results = await cloudinary.uploader.upload("./image/headphone.png");
    const url = cloudinary.url(results.public_id);

    const { id } = req.params;
    const catagorys = await catagory.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        parent: parent,
        slugs: slugs,
        count: count,
        isActive: isActive,
        image: url,
      },
      { new: true }
    );
    if (!catagorys) {
      return res.status(404).json({ error: "no such item" });
    }
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = {
  getAllCatagory,
  createCatagory,
  deleteCatagory,
  updateCatagory,
  getSingleCatagory,
};

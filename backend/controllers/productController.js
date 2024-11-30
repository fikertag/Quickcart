require("dotenv").config();
const mongoose = require("mongoose");
const product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

// get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid product ID");
    }
    const products = await product.findById(id);
    if (!products) {
      return res.status(404).send("Product not found");
    }
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// search product
const searchProducts = async (req, res) => {
  try {
    const { query, catagory, brand, tags } = req.query;
    const searchCriteria = {};
    if (query) {
      searchCriteria.name = { $regex: query, $options: "i" }; // Case-insensitive search
    }
    if (catagory) {
      searchCriteria.catagory = catagory;
    }
    if (brand) {
      searchCriteria.brand = brand;
    }
    if (tags) {
      searchCriteria.tags = brand;
    }
    console.log(searchCriteria);
    const products = await product.find(searchCriteria);
    if (!products) {
      res.status(200).send("no products");
    }
    console.log(searchCriteria);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//create products
const createProducts = async (req, res) => {
  try {
    const { name, price, description, catagory, slugs, brand, tags, isActive } =
      req.body;

    cloudinary.config({
      cloud_name: "dxanwjjcg",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const results = await cloudinary.uploader.upload("./image/headphone.png");
    const url = cloudinary.url(results.public_id);

    const products = await product.create({
      name: name,
      description: description,
      price: price,
      catagory: catagory,
      slugs: slugs,
      brand: brand,
      tags: tags,
      isActive: isActive,
      image: url,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await product.findByIdAndDelete(id);
    if (!products) {
      return res.status(404).json({ error: "no such product" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, catagory, slugs, brand, tags, isActive } =
      req.body;
    cloudinary.config({
      cloud_name: "dxanwjjcg",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const results = await cloudinary.uploader.upload("./image/headphone.png");
    const url = cloudinary.url(results.public_id);

    const { id } = req.params;
    const products = await product.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        price: price,
        catagory: catagory,
        slugs: slugs,
        brand: brand,
        tags: tags,
        isActive: isActive,
        image: url,
      },
      { new: true }
    );
    if (!products) {
      return res.status(404).json({ error: "no such item" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = {
  getAllProducts,
  createProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  searchProducts,
};

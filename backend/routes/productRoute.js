const express = require("express");
const router = express.Router();

// controller
const {
  getAllProducts,
  createProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  searchProducts,
} = require("../controllers/productController");

// get all products
router.get("/", getAllProducts);

// create products
router.post("/", createProducts);

// delete product
router.delete("/:id", deleteProduct);

// update product
router.patch("/:id", updateProduct);

// search products
router.get("/search", searchProducts);

// get single product
router.get("/:id", getSingleProduct);

module.exports = router;

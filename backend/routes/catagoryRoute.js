const express = require("express");
const router = express.Router();

// controller
const {
  getAllCatagory,
  createCatagory,
  deleteCatagory,
  updateCatagory,
  getSingleCatagory,
} = require("../controllers/catagoryController");

// get all catagory
router.get("/", getAllCatagory);

// create catagory
router.post("/", createCatagory);

// delete catagory
router.delete("/:id", deleteCatagory);

// update catagory
router.patch("/:id", updateCatagory);

// get single catagory
router.get("/:id", getSingleCatagory);

module.exports = router;

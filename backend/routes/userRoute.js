const express = require("express");
const router = express.Router();
// const auth = require("../middlewares/auth");

const {
  signupUser,
  loginUser,
  updateUserInfo,
  getAllUsers,
  getSingleUsers,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// updateUserInfo
router.patch("/updateuser/:id", updateUserInfo);

// get all user
router.get("/users", getAllUsers);

// get single user
router.get("/getuser/:id", getSingleUsers);

module.exports = router;

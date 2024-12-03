require("dotenv").config();

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

// login user
const loginUser = async (req, res) => {
  const { usernamee, password } = req.body;

  try {
    const user = await User.login(usernamee, password);
    const token = createToken(user._id);
    const { _id, username, name, phone, adress, role } = user;
    res.status(200).json({ token, _id, username, name, phone, adress, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { usernamee, password } = req.body;

  try {
    const user = await User.signup(usernamee, password);
    const token = createToken(user._id);
    console.log(token);
    const { _id, username, name, phone, adress, role } = user;
    res.status(200).json({ token, _id, username, name, phone, adress, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all users

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get single ser
const getSingleUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find({ _id: id });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// update user information

const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, username, name, phone, adress, role } =
      await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!name) {
      return res.status(404).json({ error: "no such user" });
    }
    res.status(200).json({ _id, username, name, phone, adress, role });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = {
  signupUser,
  loginUser,
  updateUserInfo,
  getAllUsers,
  getSingleUsers,
};

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  adress: {
    trpe: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
});

// static signup method

userSchema.statics.signup = async function (username, password) {
  if (!username || !password) {
    throw Error("all filds must be filed");
  }

  if (password.includes(" ")) {
    throw Error("password can not contain space");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("user alrady exists sign in or use anothe username");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};

// static login method

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("all filds must be filed");
  }

  const user = await this.findOne({ username });

  if (!username) {
    throw Error("user not registerd");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("incorrect password");
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);

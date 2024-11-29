const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

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

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("all filds must be filed");
  }

  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("password is not strong");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("alrady exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("all filds must be filed");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("email not registerd");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("incorrect password");
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);

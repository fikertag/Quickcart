require("dotenv").config();

//express app
const express = require("express");
const app = express();

// model
const mongoose = require("mongoose");

// connect to db and listin

mongoose
  .connect(process.env.MONGOOSE_CONNECTION)
  .then(() => {
    app.listen(5000, console.log("server listining on port 5000 ..."));
  })
  .catch((error) => {
    console.log(error);
  });
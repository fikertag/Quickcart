require("dotenv").config();
const cors = require("cors");

//express app
const express = require("express");
const app = express();

// model
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// router
const catagoryRouter = require("./routes/catagoryRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");

//routes
app.use("/api/v1/catagory", catagoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);

// connect to db and listin

mongoose
  .connect(process.env.MONGOOSE_CONNECTION)
  .then(() => {
    app.listen(5000, console.log("server listining on port 5000 ..."));
  })
  .catch((error) => {
    console.log(error);
  });

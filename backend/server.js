require("dotenv").config();

//express app
const express = require("express");
const app = express();

// model
const mongoose = require("mongoose");

// middleware
app.use(express.json());

// router
const cartRouter = require("./routes/cartRoute");
const catagoryRouter = require("./routes/catagoryRoute");
const orderRouter = require("./routes/orderRoute");
const paymentRouter = require("./routes/paymentRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");

//routes
// app.use("/api/v1/cart", cartRouter);
// app.use("/api/v1/catagory", catagoryRouter);
// app.use("/api/v1/order", orderRouter);
// app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/product", productRouter);
// app.use("/api/v1/user", userRouter);

// connect to db and listin

mongoose
  .connect(process.env.MONGOOSE_CONNECTION)
  .then(() => {
    app.listen(5000, console.log("server listining on port 5000 ..."));
  })
  .catch((error) => {
    console.log(error);
  });

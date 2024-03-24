require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const orderRoute = require("./routes/orderRoute");
const errorHandler = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:19000", "http://localhost:3000"], // Update with your React Native app's origin
  credentials: true,
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/orders", orderRoute);

//routes
app.get("/", (req, res) => {
  res.send("Home Page");
})

//Error Middleware
app.use(errorHandler); //refrencing errorhandler

//connecting my db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

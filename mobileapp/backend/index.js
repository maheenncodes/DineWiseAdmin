const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoute = require("./routes/userRoutes");
const restRoute = require("./routes/restaurantRoutes");
//const contactRoute = require("./routes/contactRoute");
// const errorHandler = require("./middleWare/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }))

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoute);
app.use("/api/restaurant", restRoute);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
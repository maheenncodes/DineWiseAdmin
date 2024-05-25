require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { WebSocketServer } = require('ws');

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const orderRoute = require("./routes/orderRoute");
const errorHandler = require("./middleWare/errorMiddleWare");



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:19000", "http://localhost:8081"], // Update with your React Native app's origin
  credentials: true,
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use(errorHandler); // referencing errorhandler

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const wss = new WebSocketServer({ server });

    wss.on('connection', ws => {
      console.log('Client connected');

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    const db = mongoose.connection;
    const orderCollection = db.collection('orders'); // Change to your collection name

    const changeStream = orderCollection.watch();

    changeStream.on('change', change => {
      console.log('Change detected:', change);

      const { fullDocument } = change;

      if (!fullDocument) return;

      const { _id, userId } = fullDocument;

      if (!userId) return;

      const message = {
        operationType: change.operationType,
        userId,
        _id
      };

      wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

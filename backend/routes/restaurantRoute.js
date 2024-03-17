const express = require("express");
const router = express.Router();
const { registerRestaurant } = require("../controllers/restaurantController");
const protect = require("../middleWare/authMiddleWare");
const { upload } = require("../utils/fileUpload");

router.post("/register", protect, upload.single("image"), registerRestaurant);

module.exports = router;

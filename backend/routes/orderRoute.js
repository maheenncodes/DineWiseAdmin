const express = require("express");
const router = express.Router();
const { addToTable } = require("../controllers/orderController");
const protect = require("../middleWare/authMiddleWare");

router.post("/addToTable", protect, addToTable);
module.exports = router;

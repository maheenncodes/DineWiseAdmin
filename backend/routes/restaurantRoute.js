const express = require("express");
const router = express.Router();
const { registerRestaurant,addMenuItem,viewRestaurantDetails,updateMenuItem,deleteMenuItem,viewAllCategories, viewMenuDetails, addRestaurantStaff } = require("../controllers/restaurantController");
const protect = require("../middleWare/authMiddleWare");
const { upload } = require("../utils/fileUpload");

router.post("/register", protect, upload.single("image"), registerRestaurant);
router.post("/add_menu_item", protect, upload.single("image"), addMenuItem);
router.post("/update_menu_item", protect, upload.single("image"), updateMenuItem);
router.post("/view_details", viewRestaurantDetails);
router.delete("/delete_item", protect, deleteMenuItem);
router.get("/view_categories", protect, viewAllCategories);
router.get("/view_menu_details", protect, viewMenuDetails);
router.post("/add_staff", protect, addRestaurantStaff);
module.exports = router;

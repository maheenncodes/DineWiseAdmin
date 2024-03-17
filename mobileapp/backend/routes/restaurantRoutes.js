const express = require('express');
const router = express.Router();
const {
    getAllRestaurants, getMenuItemsForRestaurant
} = require("../controllers/restaurantController");

router.get("/getAllRestaurants", getAllRestaurants);
router.get('/:restaurantId/menu-items', getMenuItemsForRestaurant);


module.exports = router;
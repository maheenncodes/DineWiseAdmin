const asyncHandler = require("express-async-handler");
const Restaurant  = require("../Models/restaurantModel"); // import models
const MenuItem  = require("../Models/menuItem"); // import models

const getAllRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find({}); // Add any query parameters if needed
    console.log(restaurants)
    res.json(restaurants);
});

const getMenuItemsForRestaurant = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;
  
    const restaurant = await Restaurant.findById(restaurantId).populate('menu.items');
    if (!restaurant) {
      res.status(404);
      throw new Error('Restaurant not found');
    }
  
    const menuItems = restaurant.menu.items;
    res.json(menuItems);
  });

module.exports = {getAllRestaurants, getMenuItemsForRestaurant}
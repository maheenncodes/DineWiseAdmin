// api-restaurant.js

import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.13:5000';

// Function to fetch all restaurants
export const fetchAllRestaurants = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/view_restaurants_list`, config);

        return response.data;
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        throw error;
    }
};

// Function to fetch menu details for a specific restaurant
export const fetchMenuDetails = async (restaurantId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/view_menu_details?restaurantId=${restaurantId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu details:', error.message);
        throw error;
    }
};

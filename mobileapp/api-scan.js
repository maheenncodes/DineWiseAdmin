// api-scan.js
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.14:5000';

export const fetchRestaurantDetails = async (restaurantId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/restaurants/view_details`, { restaurantId });
        return response.data.restaurant;
    } catch (error) {
        throw new Error("Error fetching restaurant details");
    }
};


import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.13:5000';

export const fetchRestaurantDetails = async (restaurantId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/restaurants/view_details`, { restaurantId });
        return response.data.restaurant;
    } catch (error) {
        throw new Error("Error fetching restaurant details");
    }
}; export const addToTable = async ({ restaurantId, tableId, userId, token }) => {
    try {
        console.log('Adding user to table:', restaurantId, tableId, userId);
        const response = await axios.post(`${API_BASE_URL}/api/orders/add_to_table?restaurantId=${restaurantId}&tableId=${tableId}`, { userId }, {
            headers: {
                Authorization: `Bearer ${token}` // Make sure the token is included in the headers
            }
        });
        const { cartId, orderId, message } = response.data;
        console.log(`${message} Cart ID: ${cartId}, Order ID: ${orderId}`);
        console.log("tableid:", tableId);
        return { cartId, orderId, message };
    } catch (error) {
        console.error('Error adding user to table:', error);
        throw new Error('Error adding user to table');
    }
};

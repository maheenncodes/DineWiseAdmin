// api-order.js
import axios from 'axios';

export const placeOrderAPI = async (token, restaurantId, tableId, userId, itemList) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.post('http://192.168.1.14:5000/api/orders/place_order', {
            restaurantId,
            tableId,
            userId,
            itemList,
        }, config);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message === "No order is currently in progress at that table.") {
            // Handle the specific case where no ongoing order exists
            console.log("No ongoing order exists for the specified table.");
        } else {
            // Handle other errors
            console.error("Error placing order:", error);
        }
    }
};

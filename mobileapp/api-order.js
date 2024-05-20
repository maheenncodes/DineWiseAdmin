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
        console.log("tableid:", tableId)
        const response = await axios.post('http://192.168.1.14:5000/api/orders/place_order', {
            restaurantId,
            tableId,
            userId,
            itemList,
        }, config);

        return response.data;
    } catch (error) {
        console.error('Error placing order:', error.response ? error.response.data : error.message);
        throw error;
    }
};

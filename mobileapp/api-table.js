import axios from 'axios';

export const fetchMembersData = async (token, restaurantId, tableId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log(tableId, restaurantId)
        const response = await axios.get(`http://192.168.1.13:5000/api/orders/view_all?restaurantId=${restaurantId}&tableId=${tableId}`, config);
        console.log('Response:', response.data);
        const membersData = response.data;

        if (membersData.message) {
            console.log(membersData.message); // Handle message appropriately

            // If the message indicates no current orders, return an empty array and 0 total
            if (membersData.message === "No order is currently in progress at that table.") {
                return { members: [], totalBill: 0 };
            } else {
                // Handle other messages if necessary
                return { members: [], totalBill: 0, message: membersData.message };
            }
        } else {
            console.log(membersData); // Handle members data

            // Calculate total bill
            const totalBill = membersData.reduce((total, member) => total + member.totalPrice, 0);

            return { members: membersData, totalBill };
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);

            // Handle the specific case where no order is in progress
            if (error.response.data.message === "No order is currently in progress at that table.") {
                return { members: [], totalBill: 0 };
            }

            // Other error responses can be handled here
            return { members: [], totalBill: 0, error: error.response.data.message };
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }

        console.error('Error config:', error.config);
        // Rethrow the error to be handled by the calling function
        throw error;
    }
};

export const getOrderStatus = async (token, orderId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log('Getting order status for order:', orderId);
        const response = await axios.get(`http://192.168.1.13:5000/api/orders/get_order_status?orderId=${orderId}`, config);
        console.log('Order status response:', response.data);
        return response.data.status;
    } catch (error) {
        console.error('Error getting order status:', error.response ? error.response.data : error.message);
        throw error;
    }
}
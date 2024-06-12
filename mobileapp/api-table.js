
import axios from 'axios';

export const fetchMembersData = async (token, restaurantId, tableId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        if (!tableId) {
            console.log('Table ID is missing');
            // return { members: [], totalBill: 0, totalPaid: 0, totalVerified: 0 };
        }
        console.log('Fetching members data:');
        const response = await axios.get(`http://192.168.1.13:5000/api/orders/view_all?restaurantId=${restaurantId}&tableId=${tableId}`, config);

        const membersData = response.data.members;
        const totalBill = response.data.totalBill;
        const totalPaid = response.data.totalPaid;
        const totalVerified = response.data.totalVerified;

        return { members: membersData, totalBill, totalPaid, totalVerified };

    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            if (error.response.data.message === "No order is currently in progress at that table.") {
                return { members: [], totalBill: 0, totalPaid: 0, totalVerified: 0 };
            }
            return { members: [], totalBill: 0, totalPaid: 0, totalVerified: 0, error: error.response.data.message };
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }

        console.error('Error config:', error.config);
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
        console.log("getting order status");
        const response = await axios.get(`http://192.168.1.13:5000/api/orders/get_order_status?orderId=${orderId}`, config);

        return response.data.status;
    } catch (error) {
        console.error('Error getting order status:', error.response ? error.response.data : error.message);
        throw error;
    }
};
import axios from 'axios';

export const fetchMembersData = async (token, restaurantId, tableId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`http://192.168.1.14:5000/api/orders/view_all?restaurantId=${restaurantId}&tableId=${tableId}`, config);
        const membersData = response.data;

        if (membersData.message) {
            console.log(membersData.message); // Handle message appropriately
            // If the message is about no orders, return an empty array and 0 total
            if (membersData.message === "No order is currently in progress at that table.") {
                return { members: [], totalBill: 0 };
            }
        } else {
            console.log(membersData); // Handle members data

            // Calculate total bill
            let total = 0;
            membersData.forEach(member => {
                total += member.totalPrice;
            });

            return { members: membersData, totalBill: total };
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message === "No order is currently in progress at that table.") {
            console.log(error.response.data.message);
            // Handle the specific case where no order is in progress
            return { members: [], totalBill: 0 };
        } else {
            console.error('Error fetching members data:', error);

            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
            // Rethrow the error to be handled by the calling function
            throw error;
        }
    }
};

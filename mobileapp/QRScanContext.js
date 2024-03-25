// QRScanContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

const QRScanContext = createContext();
const API_BASE_URL = 'http://192.168.0.100:5000';

export const QRScanProvider = ({ children }) => {
    const [isScanned, setIsScanned] = useState(false);
    const [scannedRestaurant, setScannedRestaurant] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleScan = async (restaurantId, tableId) => {
        try {
            // Fetch restaurant details
            const restaurantResponse = await axios.post('/api/restaurants/view_details', { restaurantId });
            const restaurantData = restaurantResponse.data.restaurant;

            // Fetch table status
            ////const tableResponse = await axios.post('<YOUR_TABLE_API_ENDPOINT>', { tableId });
            //  const tableStatus = tableResponse.data.status;

            if (restaurantData) {//} && tableStatus) {
                setScannedRestaurant(restaurantData);
                setIsScanned(true);
            } else {
                throw new Error("Error fetching restaurant or table details");
            }
        } catch (error) {
            setErrorMessage(error.message);
            // Handle error appropriately (e.g., show error message to the user)
        }
    };

    return (
        <QRScanContext.Provider value={{ isScanned, setIsScanned, scannedRestaurant, handleScan, errorMessage }}>
            {children}
        </QRScanContext.Provider>
    );
};

export default QRScanContext;

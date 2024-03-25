// QRScanContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const QRScanContext = createContext();
const API_BASE_URL = 'http://192.168.1.12:5000';

export const QRScanProvider = ({ children }) => {
    const [isScanned, setIsScanned] = useState(false);
    const [scannedRestaurant, setScannedRestaurant] = useState({
        __v: null,
        _id: null,
        admin: null,
        closingTime: null,
        description: null,
        logo: null,
        menu: [],
        name: null,
        openingTime: null,
        phoneNo: null,
        staff: [],
        tables: []
    });
    const [errorMessage, setErrorMessage] = useState(null);



    const handleScan = async (restaurantId, tableId) => {
        try {
            const restaurantResponse = await axios.post(`${API_BASE_URL}/api/restaurants/view_details`, { restaurantId });
            const restaurantData = restaurantResponse.data.restaurant;

            if (restaurantData) {
                console.log("restaurantData", restaurantResponse.data.restaurant);
                console.log("sr", scannedRestaurant)
                setScannedRestaurant(restaurantData);

                setIsScanned(true);





            } else {
                throw new Error("Error fetching restaurant details");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        console.log("sr", scannedRestaurant)
    };

    return (
        <QRScanContext.Provider value={{ isScanned, setIsScanned, scannedRestaurant, handleScan, errorMessage }}>
            {children}
        </QRScanContext.Provider>
    );
};

export default QRScanContext;

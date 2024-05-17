// QRScanContext.js
import React, { createContext, useState } from 'react';
import { fetchRestaurantDetails } from './api-scan';

const QRScanContext = createContext();

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
            const restaurantData = await fetchRestaurantDetails(restaurantId);

            if (restaurantData) {
                setScannedRestaurant(restaurantData);
                setIsScanned(true);
                console.log('Scanned restaurant:', restaurantData);
            } else {
                throw new Error("Error fetching restaurant details");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <QRScanContext.Provider value={{ isScanned, setIsScanned, scannedRestaurant, handleScan, errorMessage }}>
            {children}
        </QRScanContext.Provider>
    );
};

export default QRScanContext;

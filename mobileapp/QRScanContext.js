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
    const [scannedTableId, setScannedTableId] = useState(null); // Add table ID state
    const [errorMessage, setErrorMessage] = useState(null);
    const [order, setOrder] = useState(null);
    const [cartId, setCartId] = useState(null);

    const handleScan = async (restaurantId, tableId, orderId, cartId) => {
        try {
            const restaurantData = await fetchRestaurantDetails(restaurantId);

            if (restaurantData) {
                setScannedRestaurant(restaurantData);
                setScannedTableId(tableId); // Set table ID
                setOrder(orderId);
                setCartId(cartId);
                setIsScanned(true);
                //   console.log('Scanned restaurant:', restaurantData);
                //   console.log('Set Order Id', order);
            } else {
                throw new Error("Error fetching restaurant details");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <QRScanContext.Provider value={{ isScanned, setIsScanned, scannedRestaurant, scannedTableId, handleScan, errorMessage, order, cartId }}>
            {children}
        </QRScanContext.Provider>
    );
};

export default QRScanContext;
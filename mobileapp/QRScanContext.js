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
    const [scannedTableId, setScannedTableId] = useState("6668b4a5720ab6b97bbd040e");
    const [errorMessage, setErrorMessage] = useState(null);
    const [order, setOrder] = useState(null);
    const [cartId, setCartId] = useState(null);

    const handleScan = async (restaurantId, tableId, orderId, cartIdd) => {
        try {
            const restaurantData = await fetchRestaurantDetails(restaurantId);
            console.log("SETTERS", restaurantData, tableId, orderId, cartId)
            if (restaurantData) {
                setScannedRestaurant(restaurantData);
                console.log('Scanned restaurant:', scannedRestaurant);
                setScannedTableId(tableId); // Set table ID after scanning
                console.log('Scanned table ID:', scannedTableId);
                setOrder(orderId);
                console.log('Set Order Id', order);
                setCartId(cartIdd);
                console.log('Set Cart Id', cartId);
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
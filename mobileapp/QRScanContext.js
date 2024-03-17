// QRScanContext.js
import React, { createContext, useState } from 'react';

const defaultRestaurant = {
    id: '0',
    name: 'Novu',
    description: '12pm-11pm',
    image: require('./assets/novu.png')
};

const QRScanContext = createContext();

export const QRScanProvider = ({ children }) => {
    const [isScanned, setIsScanned] = useState(false);
    const [scannedRestaurant, setScannedRestaurant] = useState(defaultRestaurant);

    const handleScan = (restaurantDetails) => {
        setIsScanned(true);
        //setScannedRestaurant(restaurantScanned); fix it later according to the scan
    };

    return (
        <QRScanContext.Provider value={{ isScanned, setIsScanned, scannedRestaurant, setScannedRestaurant, handleScan }}>
            {children}
        </QRScanContext.Provider>
    );
};

export default QRScanContext;

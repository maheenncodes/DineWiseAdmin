// OrderContext.js

import React, { createContext, useState } from 'react';

const OrderContext = createContext();
const OrderProvider = ({ children }) => {
    const [ongoingOrder, setOngoingOrder] = useState(false);

    const placeOrder = () => {
        setOngoingOrder(true);
    };

    const contextValue = {
        ongoingOrder,
        placeOrder, // Ensure that placeOrder is included in the context
    };

    return <OrderContext.Provider value={contextValue}>{children}</OrderContext.Provider>;
};


export { OrderContext, OrderProvider };
import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};

// Cart provider component to manage cart state and actions
export const CartProvider = ({ children }) => {
    // State to store cart items
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

        if (itemIndex !== -1) {
            // If item exists in the cart, update its quantity
            const updatedCartItems = cartItems.map((cartItem, index) =>
                index === itemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCartItems);
        } else {
            // If item does not exist in the cart, add it with a quantity of 1
            const newItem = { ...item, quantity: 1 };
            setCartItems([...cartItems, newItem]);
        }
    };



    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Function to set the cart items directly
    const setCartItemsDirectly = (items) => {
        setCartItems(items);
    };

    // Value object to provide cart data and functions to children components
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        setCartItems: setCartItemsDirectly, // Include setCartItems in the context
    };

    // Provide the context value to the children components
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

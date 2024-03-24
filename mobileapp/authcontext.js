// authcontext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, logoutUser } from './api-user'; // Import login and logout functions

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const checkLoggedIn = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                console.log('loggedin check : User logged in:', userData);
                // If token exists, set the user
                setUser({ token });
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const userData = await loginUser({ email, password });
            setUser(userData); // Update the user in the context
            console.log('User logged in:', userData);
            // Store the token in AsyncStorage
            await AsyncStorage.setItem('token', userData.token);
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            // Clear user data from context and AsyncStorage
            setUser(null);
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.error('Logout failed:', error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

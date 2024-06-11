import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './authcontext'; // Import the AuthContext

export const useAuth = () => useContext(AuthContext);

const BASE_URL = 'http://192.168.1.13:5000/api/users'; // Define a constant for the base URL

// Register user function
export const registerUser = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            name,
            email,
            password,
            role: 'customer'
        });
        console.log('name:', name, 'email:', email, 'password:', password)
        console.log('User registered api:', response.data)
        return response.data; // Return the data upon successful registration
    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};

// Login user function
export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email,
            password
        });
        //console.log('User logged in api:', response.data);

        return response.data; // Return the data upon successful login

    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};

// Logout user function
export const logoutUser = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/logout`);

        // Access the context to update user authentication
        setUser(null); // Clear the user in the context

        return response.data; // Return the data upon successful logout
    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};

// Update user function
export const updateUser = async ({ name, email, phone, bio, photo }) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateuser`, {
            name,
            email,
            phone,
            bio,
            photo
        });
        return response.data; // Return the data upon successful update
    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};

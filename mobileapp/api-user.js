import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './authcontext'; // Import the AuthContext

export const useAuth = () => useContext(AuthContext);

// Register user function
export const registerUser = async ({ name, email, password }) => {
    try {
        const response = await axios.post('http://10.104.130.5/api/users/register', {
            name,
            email,
            password,
            role: 'customer'
        });
        return response.data; // Return the data upon successful registration
    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};

// Login user function
export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.post('http://10.104.130.5/api/users/login', {
            email,
            password
        });
        console.log('User logged in api:', response.data);

        return response.data; // Return the data upon successful login

    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};


// Logout user function
export const logoutUser = async () => {
    try {
        const response = await axios.post('http://10.104.130.5/api/users/logout');

        // Access the context to update user authentication
        const { setUser } = useAuth();
        setUser(null); // Clear the user in the context

        return response.data; // Return the data upon successful logout
    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};

// Update user function
export const updateUser = async ({ name, email, phone, bio, photo }) => {
    try {
        const response = await axios.put('http://10.104.130.5/api/users/updateuser', {
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

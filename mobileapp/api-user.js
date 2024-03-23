import axios from 'axios';

// Register user function
export const registerUser = async ({ name, email, password }) => {
    try {
        const response = await axios.post('http://192.168.0.100:5000/api/users/register', {
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
        const response = await axios.post('http://192.168.0.100:5000/api/users/login', {
            email,
            password
        });
        return response.data; // Return the data upon successful login
    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};

// Logout user function
export const logoutUser = async () => {
    try {
        const response = await axios.post('http://192.168.0.100:5000/api/users/logout');
        return response.data; // Return the data upon successful logout
    } catch (error) {
        throw error; // Throw error for handling in the component
    }
};

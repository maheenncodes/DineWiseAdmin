import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import UpdateUser from './Updateuser'; // Import UpdateUserScreen component

const UserDropdownModal = ({ visible, onClose }) => {
    const navigation = useNavigation(); // Initialize navigation hook

    const handleUpdateUser = () => {
        navigation.navigate('UpdateUser'); // Navigate to UpdateUserScreen
        onClose(); // Close the dropdown modal
    };


    const handleLogout = async () => {
        try {
            await logoutUser();
            // Logic to handle successful logout (navigate to login screen, etc.)
        } catch (error) {
            console.error('Logout failed:', error.message);

            // Additional error information
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Request setup error:', error.message);
            }

            // Logic to handle logout failure (show error message, etc.)
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem} onPress={handleUpdateUser}>
                    <Text style={styles.menuText}>Update User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
        position: 'absolute',
        top: 60,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuText: {
        fontSize: 16,
    },
});

export default UserDropdownModal;

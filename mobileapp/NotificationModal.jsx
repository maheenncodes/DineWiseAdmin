import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const NotificationModal = ({ message, closeModal }) => {
    return (
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{message}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#eb5b53',
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
});

export default NotificationModal;
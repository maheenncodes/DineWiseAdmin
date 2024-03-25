// QRScanner.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import QRScanContext from './QRScanContext';

const QRScanner = ({ navigation }) => {
    const { handleScan } = useContext(QRScanContext);

    const restaurantId = '65f6b800ebfe51ea62ba5e45';
    const tableId = '65fbab5aa1734426bf68554c';

    const handleScanPress = () => {
        handleScan(restaurantId, tableId);
        navigation.navigate('RestaurantMenu'); // Assuming navigation to 'RestaurantMenu' after scan
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
                <Text style={styles.scanButtonText}>Scan QR Code</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanButton: {
        backgroundColor: '#eb5b53',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
    },
    scanButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default QRScanner;

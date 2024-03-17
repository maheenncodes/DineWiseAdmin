import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Animated } from 'react-native';
import Footer from './Footer';
import Header from './Header';
import QRScanContext from './QRScanContext';

const QRScanner = ({ navigation, route }) => {
    const { isScanned, setIsScanned, scannedRestaurant } = useContext(QRScanContext);


    const handleScan = () => {
        setIsScanned(true);
        // Set the scanned restaurant details here

        navigation.navigate('RestaurantMenu', { restaurant: scannedRestaurant });


    };



    return (
        <View style={styles.scanQRContainer}>

            <Image
                source={require('./assets/scanqr.png')}
                style={styles.qrCodeImage}
                resizeMode="contain"
            />
            <Text style={styles.scanQRText}>Simulated QR Code Scanner</Text>
            <TouchableOpacity style={styles.scanButton} onPress={() => handleScan()}>
                <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,

    },
    scanQRContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    qrCodeImage: {
        width: '70%',
        height: '30%',
        marginBottom: 20,
    },
    scanQRText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
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

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, Animated } from 'react-native';
import Footer from './Footer';
import Header from './Header';
import QRScanContext from './QRScanContext';

const ScanQRScreen = ({ navigation }) => {
    const { isScanned } = useContext(QRScanContext);


    const handleScan = () => {
        // Example: Simulating a fading animation when the QR code is scanned

        navigation.navigate('QRScanner');

    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <View style={styles.contentContainer}>
                {!isScanned ? (
                    <View style={[styles.scanQRContainer]}>
                        <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                            <Text style={styles.scanButtonText}>Scan QR Code</Text>
                        </TouchableOpacity>
                        <Text style={styles.scanQRText}>Scan the QR code at your table to proceed.</Text>
                    </View>
                ) : null}
            </View>

            <Footer navigation={navigation} activeIcon="solution1" />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,

    },
    backgroundImage: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    scanQRContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#eb5b53',
    },
    scanButton: {
        backgroundColor: '#eb5b53',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        marginBottom: 20,
    },
    scanButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scanQRText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
    },
});

export default ScanQRScreen;

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRScanContext from './QRScanContext';
import { useNavigation } from '@react-navigation/native';
import { addToTable } from './api-scan'; // Import the API function
import { AuthContext } from './authcontext'; // Import AuthContext

const QRScanner = () => {
    const { handleScan } = useContext(QRScanContext);
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const restaurantId = '65fedf23aeb13eca509bcdaf';
    const tableId = '660612e5ffa707556eaf079a';
    const { user } = useContext(AuthContext); // Access user authentication state from context

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleScanPress = () => {
        navigation.navigate('Welcome');
    };

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        try {
            console.log('token:', user.token);
            console.log('data:', data);
            console.log("userid", user._id);
            await addToTable({ restaurantId, tableId, userId: user._id, token: user.token });

            handleScan(restaurantId, tableId);
            navigation.navigate('Welcome');
        } catch (error) {
            console.error('Error adding user to table:', error.message);
            // Handle error, show error message, etc.
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {!scanned && (
                <TouchableOpacity style={styles.scanButton} onPress={handleBarCodeScanned}>
                    <Text style={styles.scanButtonText}>Tap to Scan Again</Text>
                </TouchableOpacity>
            )}
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
        position: 'absolute',
        bottom: 20,
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

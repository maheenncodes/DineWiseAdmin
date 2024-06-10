import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addToTable } from './api-scan'; // Import the API function
import { AuthContext } from './authcontext'; // Import AuthContext
import { useNavigation } from '@react-navigation/native';
import QRScanContext from './QRScanContext';

const QRScanner = () => {
    const { user } = useContext(AuthContext); // Access user authentication state from context
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();
    const { handleScan } = useContext(QRScanContext);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        const ws = new WebSocket('ws://192.168.1.13:5000');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.userId === user._id) {
                // User themselves have scanned
                Alert.alert('Success', 'You have been successfully added to the table');
            } else {
                // Someone else has been added
                Alert.alert('Success', 'A new user has been added');
            }
        };

        return () => {
            ws.close();
        };
    }, []);

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        try {
            console.log('Scanned data:', data);
            const { restaurantId, tableId } = JSON.parse(data);
            console.log('Scanned Restaurant ID:', restaurantId);
            console.log('Scanned Table ID:', tableId);
            console.log('User ID:', user._id);


            // Make API call with decoded parameters
            await addToTable({ restaurantId, tableId, userId: user._id, token: user.token });


            handleScan(restaurantId, tableId);
            navigation.navigate('Welcome');

            // Handle navigation or any other action after successful scan
        } catch (error) {
            console.error('Error scanning QR code:', error.message);
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
                <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
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

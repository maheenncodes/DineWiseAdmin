import { CommonActions } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addToTable } from './api-scan'; // Import the API function
import { AuthContext } from './authcontext'; // Import AuthContext
import { useNavigation } from '@react-navigation/native';
import QRScanContext from './QRScanContext';
import TableDataContext from './TableDataContext'; // Correct import\


const QRScanner = () => {
    const { user } = useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();
    const { handleScan } = useContext(QRScanContext);
    const { setTableDataLoaded, updateTableData, loadOrderStatus, isStatusLoaded, setIsStatusLoaded } = useContext(TableDataContext);
    const { scannedRestaurant, scannedTableId, order, setIsScanned } = useContext(QRScanContext);
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        const ws = new WebSocket('ws://192.168.1.13:5000');
        console.log('Connecting to WebSocket server');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            // console.log('Message received:', event.data);
            const message = JSON.parse(event.data);
            // console.log('Parsed message:', message);  // Debugging log
            if (message.operationType === 'insert') {
                console.log('New order inserted:', message.updatedFields);
                Alert.alert('Success', 'A new user has been added to a NEW ORDER');
                setTableDataLoaded(false);
                updateTableData(user.token, scannedRestaurant._id, scannedTableId);
            }
            else if (message.operationType === 'update' && message.updatedFields) {
                console.log('Order updated:', message.updatedFields);
                const cartListKey = Object.keys(message.updatedFields).find(key => key.startsWith('cartList.'));

                if (cartListKey) {
                    Alert.alert('Success', 'A new user has been added');
                    setTableDataLoaded(false);
                    updateTableData(user.token, scannedRestaurant._id, scannedTableId);
                }
                else if ('totalPrice' in message.updatedFields) {
                    //  console.log('Total price updated:', message.updatedFields.totalPrice);
                    alert('Total Bill Updated');
                    setTableDataLoaded(false);
                    updateTableData(user.token, scannedRestaurant._id, scannedTableId);
                    // Handle total price update

                }
                else if ('totalPaid' in message.updatedFields) {
                    //  console.log('Total paid updated:', message.updatedFields.totalPaid);
                    setTableDataLoaded(false);
                    updateTableData(user.token, scannedRestaurant._id, scannedTableId);
                }

                const statusKey = Object.keys(message.updatedFields).find(key => key === 'status');
                if (statusKey) {
                    //   console.log('Order status updated:', message.updatedFields.status);
                    loadOrderStatus(user.token, order); // Assuming order ID is present in documentKey
                    setIsStatusLoaded(false);
                    if (message.updatedFields.status === 'completed') {
                        alert('Order completed, Closing Table');
                        handleScan(null, null, null, null);
                        resetNavigation(navigation);
                        setIsScanned(false);
                    }
                    alert('Order status Updated');


                }

            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    const resetNavigation = (navigation) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'CustomerHomepage' }], // Replace with your initial screen's name
            })
        );
    };

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        try {
            console.log('Scanned data:', data);
            const { restaurantId, tableId } = JSON.parse(data);
            console.log('Scanned Restaurant ID:', restaurantId);
            console.log('Scanned Table ID:', tableId);
            console.log('User ID:', user._id);


            // Make API call with decoded parameters
            data = await addToTable({ restaurantId, tableId, userId: user._id, token: user.token });
            console.log("Added to table");
            console.log('Data:', data);
            const orderID = data.orderId;
            const cartId = data.cartId;
            console.log('Order ID:', orderID);

            handleScan(restaurantId, tableId, orderID, cartId);
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

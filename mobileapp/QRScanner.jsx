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
    const { setTableDataLoaded, updateTableData, loadOrderStatus, isStatusLoaded, setIsStatusLoaded, setTableStatusLoaded } = useContext(TableDataContext);
    const { scannedRestaurant, scannedTableId, order, setIsScanned, setScannedTableId } = useContext(QRScanContext);
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

            const message = JSON.parse(event.data);
            console.log("Scanned table id", scannedTableId);

            if (message.operationType === 'insert') {
                console.log('New order inserted:', message.updatedFields);
                Alert.alert('Success', 'A new user has been added to a NEW ORDER');

            }


            if (message.operationType === 'update' && message.updatedFields) {
                console.log('Order updated:', message.updatedFields);
                const cartListKey = Object.keys(message.updatedFields).find(key => key.startsWith('cartList.'));
                const statusKey = Object.keys(message.updatedFields).find(key => key === 'status');

                if (cartListKey) {
                    console.log('Cart list updated:', message.updatedFields[cartListKey]);
                    Alert.alert('Success', 'A new user has been added');
                    setTableDataLoaded(false);
                    updateTableData(user.token, scannedRestaurant._id, scannedTableId);
                }
                if ('totalPrice' in message.updatedFields) {
                    console.log('Total price updated:', message.updatedFields.totalPrice);
                    alert('Total Bill Updated');
                    setTableDataLoaded(false);
                    updateTableData(user.token, scannedRestaurant._id, scannedTableId);


                }
                if (statusKey) {
                    console.log('Order status updated:', message.updatedFields.status);
                    setTableStatusLoaded(false);
                    loadOrderStatus(user.token, order); // Assuming order ID is present in documentKey

                    if (message.updatedFields.status === 'completed') {
                        alert('Order completed, Closing Table');
                        //  handleScan(null, null, null, null);
                        resetNavigation(navigation);
                        setIsScanned(false);
                    }
                    alert('Order status Updated');
                }

                if ('totalPaid' in message.updatedFields) {
                    console.log('Total paid updated:', message.updatedFields.totalPaid);
                    setTableDataLoaded(false);
                    updateTableData(user.token, scannedRestaurant._id, scannedTableId);
                }

                if ('totalVerified' in message.updatedFields) {
                    console.log('Total paid updated:', message.updatedFields.totalPaid);
                    setTableDataLoaded(false);
                    updateTableData(user.token, scannedRestaurant._id, scannedTableId);
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

            const { restaurantId, tableId } = JSON.parse(data);



            // Make API call with decoded parameters
            data = await addToTable({ restaurantId, tableId, userId: user._id, token: user.token });

            const orderID = data.orderId;
            const cartId = data.cartId;
            setScannedTableId(tableId);

            handleScan(restaurantId, tableId, orderID, cartId);
            setTableDataLoaded(false);


            updateTableData(user.token, restaurantId, tableId);
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

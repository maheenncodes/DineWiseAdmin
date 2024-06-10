import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import TableDataContext from './TableDataContext'; // Correct import
import QRScanContext from './QRScanContext';
import axios from 'axios';
import { AuthContext } from './authcontext';

const Payment = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [payFullBill, setPayFullBill] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState('');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const { scannedRestaurant, scannedTableId, order, cartId } = useContext(QRScanContext);


    const { totalBill, setTotalBill, myShare, setMyShare } = useContext(TableDataContext); // Correct usage of context

    // const totalBill = 100; // Replace with the actual total bill amount
    //  const myShare = 25; // Replace with the actual share amount

    const handlePayFullBill = () => {
        Alert.alert('Payment Confirmation', 'Paid full bill successfully!');
        // Implement payment gateway integration for full bill payment
    };

    const handlePayYourShare = async () => {
        console.log("token", user.token);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                params: {
                    orderId: order,
                    cartId: cartId,
                }
            };

            const response = await axios.post('http://192.168.1.13:5000/api/orders/pay_individual_bill', { paymentMethod: selectedGateway }, config);

            if (response.status === 200) {
                Alert.alert('Payment Confirmation', response.data.message);
            } else {
                Alert.alert('Error', 'Failed to pay your share. Please try again later.');
            }
        } catch (error) {
            if (error.response) {
                console.log('Server Error:', error.response.data);
                console.log('Status:', error.response.status);
                console.log('Headers:', error.response.headers);
                Alert.alert('Error', 'Failed to pay your share. Please try again later.');
            } else if (error.request) {
                console.log('Request Error:', error.request);
                Alert.alert('Error', 'No response from server. Please check your network connection and try again.');
            } else {
                console.log('Error:', error.message);
                Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
        }
    };



    const handleGatewayPress = (gateway) => {
        setSelectedGateway(gateway);
        // Prompt user for account number here
        // For demo purposes, using a simple alert
        Alert.prompt('Enter Account Number', `Enter your ${gateway} account number:`, (text) => {
            if (text) {
                // You can handle the account number here
                Alert.alert('Account Number', `Entered account number: ${text}`);
            }
        });
    };

    const handlePaymentOptionPress = (option) => {
        setSelectedPaymentOption(option);
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.paymentContainer}>
                <View style={styles.paymentOptions}>
                    <TouchableOpacity
                        style={[
                            styles.paymentButton,
                            payFullBill ? styles.selectedPayment : null,
                        ]}
                        onPress={() => {
                            setPayFullBill(true);
                            handlePaymentOptionPress('Pay Full Bill');
                        }}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedPaymentOption === 'Pay Full Bill' ? styles.selectedPaymentText : null,
                        ]}>Pay Full Bill</Text>
                        <Text style={styles.amountText}>Full Bill Amount: ${totalBill}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.paymentButton,
                            !payFullBill ? styles.selectedPayment : null,
                        ]}
                        onPress={() => {
                            setPayFullBill(false);
                            handlePaymentOptionPress('Pay Only Yours');
                        }}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedPaymentOption === 'Pay Only Yours' ? styles.selectedPaymentText : null,
                        ]}>Pay Only Yours</Text>
                        <Text style={styles.amountText}>Your Share Amount: ${myShare}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.paymentGateways}>
                    <Text style={styles.paymentGatewaysTitle}>Payment Gateways</Text>
                    <View style={styles.paymentGatewayRow}>

                        <TouchableOpacity
                            style={[
                                styles.paymentGateway,
                                selectedGateway === 'Bank Cards' ? styles.selectedPayment : null,
                            ]}
                            onPress={() => handleGatewayPress('Bank Cards')}
                        >
                            <Image
                                source={require('./assets/bc.png')}
                                style={styles.paymentGatewayIcon}
                            />
                            <Text style={[
                                styles.paymentGatewayText,
                                selectedGateway === 'Bank Cards' ? styles.selectedPaymentText : null,
                            ]}>Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.paymentGateway,
                                selectedGateway === 'Cash' ? styles.selectedPayment : null,
                            ]}
                            onPress={() => handleGatewayPress('Cash')}
                        >
                            <Image
                                source={require('./assets/cash.png')}
                                style={styles.paymentGatewayIcon}
                            />
                            <Text style={[
                                styles.paymentGatewayText,
                                selectedGateway === 'Cash' ? styles.selectedPaymentText : null,
                            ]}>Cash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.paymentGateway,
                                selectedGateway === 'Jazzcash' ? styles.selectedPayment : null,
                            ]}
                            onPress={() => handleGatewayPress('Jazzcash')}
                        >
                            <Image
                                source={require('./assets/jc.png')}
                                style={styles.paymentGatewayIcon}
                            />
                            <Text style={[
                                styles.paymentGatewayText,
                                selectedGateway === 'Jazzcash' ? styles.selectedPaymentText : null,
                            ]}>Jazzcash</Text>
                        </TouchableOpacity>

                        {/* Add other payment gateways similarly */}
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.payButton}
                    onPress={payFullBill ? handlePayFullBill : handlePayYourShare}
                >
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
            </View>
            <Footer navigation={navigation} activeIcon="shoppingcart" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,

    },
    paymentContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    amountText: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
    },
    paymentOptions: {},
    paymentButton: {
        paddingVertical: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        alignItems: 'center',
    },
    selectedPayment: {
        backgroundColor: '#eb5b53',
        borderColor: '#eb5b53',
        color: 'white',
    },
    selectedPaymentText: {
        color: '#fff',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    paymentGateways: {
        marginTop: 20,
        // Change flexDirection to row
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow items to wrap into the next row if needed
        justifyContent: 'space-between', // Adjust the space between items
    },
    paymentGatewayRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%', // Set width to occupy full space
    },
    paymentGatewaysTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paymentGateway: {
        flexDirection: 'row',
        alignItems: 'center',

        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    paymentGatewayIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    paymentGatewayText: {
        color: '#000',
        fontSize: 16,
    },
    selectedPaymentText: {
        color: '#fff',
    },
    payButton: {
        backgroundColor: '#eb5b53',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 30,
        alignItems: 'center',
    },
    payButtonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default Payment;

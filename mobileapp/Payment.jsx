import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const Payment = ({ navigation }) => {
    const [payFullBill, setPayFullBill] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState('');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [fullBillAmount, setFullBillAmount] = useState(116); // Replace with your full bill amount
    const [yourShareAmount, setYourShareAmount] = useState(28); // Replace with your share amount

    const handlePayFullBill = () => {
        Alert.alert('Payment Confirmation', 'Paid full bill successfully!');
        // Implement payment gateway integration for full bill payment
    };

    const handlePayYourShare = () => {
        Alert.alert('Payment Confirmation', 'Paid your share successfully!');
        // Implement payment gateway integration for individual payment
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
                        <Text style={styles.amountText}>Full Bill Amount: ${fullBillAmount}</Text>

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
                        <Text style={styles.amountText}>Your Share Amount: ${yourShareAmount}</Text>
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

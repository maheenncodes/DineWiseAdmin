import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { OrderContext } from './OrderContext';
import { useCart } from './CartContext';
import Footer from './Footer';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

const OrderStatus = ({ navigation }) => {
    const { ongoingOrder } = useContext(OrderContext);
    const { cartItems } = useCart();

    const calculateTotalBill = () => {
        return cartItems.reduce((total, item) => {
            const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
            return total + numericPrice * item.quantity;
        }, 0);
    };

    const handlePayBill = () => {
        // Logic to navigate to the payment screen or process the payment
        // For example:
        navigation.navigate('Payment');
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.orderContainer}>
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                    Total Bill: ${calculateTotalBill()}
                </Text>
                <TouchableOpacity style={styles.payButton} onPress={handlePayBill}>
                    <Text style={styles.payButtonText}>Pay Bill</Text>
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
    orderContainer: {
        flex: 1,
        padding: 20,
        paddingBottom: 70,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
    totalContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
    },
    totalText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    payButton: {
        backgroundColor: '#eb5b53',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default OrderStatus;

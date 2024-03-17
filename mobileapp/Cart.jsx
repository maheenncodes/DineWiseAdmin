import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Footer from './Footer';
import Header from './Header';
import { useCart } from './CartContext';
import { Alert } from 'react-native';
import NotificationModal from './NotificationModal';
import { OrderContext } from './OrderContext';
import OrderStatus from './OrderStatus';
import QRScanContext from './QRScanContext';
const Cart = ({ navigation }) => {
    const { cartItems, setCartItems } = useCart();
    const { ongoingOrder, placeOrder } = useContext(OrderContext);
    const [orderPlaced, setOrderPlaced] = useState(false);


    const removeFromCart = (id) => {
        // Remove item logic
        setCartItems(cartItems.filter(item => item.id !== id));
    };


    const increaseQuantity = (id) => {
        // Increment quantity logic using cart context
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        // Update cart items
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (id) => {
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            if (updatedCartItems[itemIndex].quantity > 1) {
                // Decrement quantity if greater than 1
                updatedCartItems[itemIndex].quantity -= 1;
                setCartItems(updatedCartItems);
            } else {
                Alert.alert(
                    'Remove Item',
                    'Are you sure you want to remove this item from your cart?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Remove',
                            onPress: () => {
                                updatedCartItems.splice(itemIndex, 1);
                                setCartItems(updatedCartItems);
                            },
                        },
                    ],
                    { cancelable: true }
                );
            }
            // Recalculate total bill after modifying cart items
            const updatedTotalPrice = calculateTotalPrice(updatedCartItems);

        }
    };


    const calculateTotalPrice = () => {
        // Calculate total price logic using cart context
        return cartItems.reduce((total, item) => {
            const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
            return total + numericPrice * item.quantity;
        }, 0);
    };

    const handlePlaceOrder = () => {
        placeOrder(); // Updating the context when the order is placed
        setOrderPlaced(true);
        setTimeout(() => {
            setOrderPlaced(false);
        }, 3000);
        navigation.navigate('OrderStatus');
    };


    const renderCartItem = ({ item }) => {




        // Extract numeric and non-numeric values
        const [, nonNumericValue, numericValue] = item.price.match(/([^0-9]+)([0-9]+)/);


        return (
            <View style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>Price: {item.price}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                            <AntDesign name="minus" size={20} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.itemQuantity}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                            <AntDesign name="plus" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.itemDelete}>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                        <AntDesign name="close" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.totalPrice}>Total: {nonNumericValue}{numericValue * item.quantity}</Text>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {cartItems.length > 0 ? (
                <View style={styles.container}>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.cartList}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            {cartItems.length > 0 ? `Total Bill: $${calculateTotalPrice()}` : ''}
                        </Text>
                        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder} disabled={cartItems.length === 0}>
                            <Text style={styles.orderButtonText}>Place Order</Text>
                        </TouchableOpacity>
                        {orderPlaced && (
                            <NotificationModal
                                message="Order Placed!"
                                closeModal={() => setOrderPlaced(false)}
                            />
                        )}
                    </View>
                </View>
            ) : (
                <View style={styles.emptyCart}>
                    <Text style={styles.emptyCartText}>Your cart is empty!</Text>
                </View>
            )}
            <Footer navigation={navigation} activeIcon="shoppingcart" />

        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,
        borderRadius: 0, // Adjust the borderRadius as necessary
        overflow: 'hidden', // This will ensure the ImageBackground respects the borderRadius

    },
    cartList: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexGrow: 1,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 15,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemQuantity: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 35,
        left: 0,
        right: 0,
    },
    totalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    orderButton: {
        backgroundColor: '#eb5b53',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    itemDelete: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    orderButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }, emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 20,

    },
});

export default Cart;

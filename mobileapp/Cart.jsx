import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Footer from './Footer';
import Header from './Header';
import { useCart } from './CartContext';
import NotificationModal from './NotificationModal';
import { AuthContext } from './authcontext';
import { OrderContext } from './OrderContext';
import { placeOrderAPI } from './api-order';
import QRScanContext from './QRScanContext';

const Cart = ({ navigation }) => {
    const { cartItems, setCartItems, removeFromCart } = useCart();
    const { user } = useContext(AuthContext);
    const { ongoingOrder } = useContext(OrderContext);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const { scannedRestaurant, scannedTableId } = useContext(QRScanContext);

    const increaseQuantity = (id) => {
        const updatedCartItems = cartItems.map(item =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (id) => {
        const itemIndex = cartItems.findIndex(item => item._id === id);
        if (itemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            if (updatedCartItems[itemIndex].quantity > 1) {
                updatedCartItems[itemIndex].quantity -= 1;
                setCartItems(updatedCartItems);
            } else {
                Alert.alert(
                    'Remove Item',
                    'Are you sure you want to remove this item from your cart?',
                    [
                        { text: 'Cancel', style: 'cancel' },
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
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePlaceOrder = async () => {
        const restaurantId = scannedRestaurant._id;
        const tableId = scannedTableId; // Get the scanned table ID
        console.log('Table ID:', tableId);
        const userId = user._id; // Assuming `user.id` is the user's ID
        const itemList = cartItems.map(item => ({
            item: item._id,
            quantity: item.quantity,
        }));

        try {
            const result = await placeOrderAPI(user.token, restaurantId, tableId, userId, itemList);
            console.log('Order placed successfully:', result);
            setOrderPlaced(true);
            setTimeout(() => {
                setOrderPlaced(true);
                setCartItems([]);
                //navigation.navigate('OrderStatus');

            }, 3000);
        } catch (error) {
            console.error('Error placing order:', error);
            Alert.alert('Error', 'Failed to place order. Please try again.');
        }
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item._id)}>
                        <AntDesign name="minus" size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item._id)}>
                        <AntDesign name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.itemDelete} onPress={() => removeFromCart(item._id)}>
                <AntDesign name="close" size={24} color="red" />
            </TouchableOpacity>
            <Text style={styles.totalPrice}>Total: ${item.price * item.quantity}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {cartItems.length > 0 ? (
                <View style={styles.container}>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={styles.cartList}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            {cartItems.length > 0 ? `Total Bill: $${calculateTotalPrice()}` : ''}
                        </Text>
                        <TouchableOpacity
                            style={styles.orderButton}
                            onPress={handlePlaceOrder}
                            disabled={cartItems.length === 0}
                        >
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,
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
        bottom: 80,
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
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 20,
    },
});

export default Cart;

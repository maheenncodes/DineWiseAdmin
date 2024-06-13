import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { MaterialIcons } from '@expo/vector-icons';
import RestaurantHeader from './RestaurantHeader';
import { useCart } from './CartContext';
import NotificationModal from './NotificationModal';
import QRScanContext from './QRScanContext';
const Item = ({ navigation, route }) => {
    // Mock item details received from the route
    const { restaurant, item } = route.params;
    const [selectedItem, setSelectedItem] = useState(null);

    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState(false);
    const { isScanned, setIsScanned, scannedRestaurant } = useContext(QRScanContext);

    useEffect(() => {
        let timer;
        if (addedToCart) {
            timer = setTimeout(() => {
                setAddedToCart(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [addedToCart]);

    const scannedRestaurantId = scannedRestaurant?.id;
    const restaurantId = restaurant?.id;

    const addToCartHandler = () => {
        if (!isScanned) {
            // Show an alert indicating that QR code needs to be scanned
            Alert.alert(
                'QR Code Not Scanned',
                'You need to scan the QR code to proceed. Choose an option:',
                [
                    {
                        text: 'Scan QR Code',
                        onPress: () => {
                            navigation.navigate('QRScanner');
                        },
                    },
                    {
                        text: 'Keep Exploring',
                        style: 'cancel',
                    },
                ],
                { cancelable: true }
            );
        } else if (scannedRestaurantId && restaurantId && scannedRestaurantId !== restaurantId) {
            // Show an alert that the item is not from the scanned restaurant
            Alert.alert(
                'Invalid Item',
                'This item is not from the scanned restaurant. Do you want to view the menu of the scanned restaurant?',
                [
                    {
                        text: 'View Menu',
                        onPress: () => {
                            // Navigate to the menu of the scanned restaurant
                            navigation.navigate('RestaurantMenu', { restaurant: scannedRestaurant });
                        },
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ],
                { cancelable: true }
            );
        } else {
            // Scanning has been done and it's the default restaurant, handle add to cart
            setSelectedItem(item);
            addToCart(item); // Add item to the cart using the context method
            setAddedToCart(true);
        }
    };



    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <ScrollView>
                <View style={styles.itemImageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titleText}>{item.name}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={addToCartHandler}
                        style={[
                            styles.addToCartButton,
                            (!isScanned || (scannedRestaurantId && restaurantId && scannedRestaurantId !== restaurantId)) &&
                            styles.disabledButton
                        ]}
                    >
                        <MaterialIcons name="add-shopping-cart" size={20} color="#fff" />
                    </TouchableOpacity>


                </View>
                <View style={styles.itemDescription}>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                </View>
            </ScrollView>
            <Footer navigation={navigation} activeIcon="home" />
            {addedToCart && (
                <NotificationModal
                    message={selectedItem ? `Added ${selectedItem.name} to cart!` : ''}
                    closeModal={() => { setAddedToCart(false); setSelectedItem(null); }}
                />
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,

    },
    itemImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        paddingVertical: 20,
        position: 'relative',
    },
    itemImage: {
        width: '80%',
        height: 300,
        borderRadius: 10,
    },
    itemPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
        paddingVertical: 10,
    },
    itemTitle: {
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addToCartButton: {
        backgroundColor: '#eb5b53',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    itemDescription: {
        paddingHorizontal: 20,
        paddingTop: 10, // Adjusted padding top
        paddingBottom: 20, // Adjusted padding bottom
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    descriptionText: {
        fontSize: 16,
    },
    addToCartButton: {
        backgroundColor: '#eb5b53',
        borderRadius: 20,
        padding: 10,
    },
    disabledButton: {
        backgroundColor: 'grey',
        opacity: 0.5,
    },


});

export default Item;
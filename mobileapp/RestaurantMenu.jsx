
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { MaterialIcons } from '@expo/vector-icons';
import RestaurantHeader from './RestaurantHeader';
import { useCart } from './CartContext';
import NotificationModal from './NotificationModal';
import QRScanContext from './QRScanContext';
import { Alert } from 'react-native';
import { AuthContext } from './authcontext'; // Import AuthContext
import axios from 'axios'; // Import axios for making HTTP requests
const API_BASE_URL = 'http://192.168.0.100:5000';

const RestaurantMenu = ({ navigation, route }) => {
    const { restaurant } = route.params;
    const { cart, addToCart } = useCart();
    const { isScanned, setIsScanned, scannedRestaurant } = useContext(QRScanContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [menuItems, setMenuItems] = useState([]); // State to store fetched menu items
    const { user } = useContext(AuthContext); // Access user authentication state from context

    const fetchMenuDetails = async (restaurantId) => {
        try {
            if (!user || !user.token) {
                console.error('User token not found');
                return;
            }


            // Include the token in the request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            // Make request to fetch menu details for the given restaurant
            const response = await axios.get(`${API_BASE_URL}/api/restaurants/view_menu_details?restaurantId=${restaurantId}`, config);

            // Assuming the response data is an array of menu items
            setMenuItems(response.data); // Update the menu items state with the fetched data

        } catch (error) {
            console.error('Error fetching menu details:', error.message);
            // Handle error
        }
    };



    useEffect(() => {

        if (restaurant && restaurant._id) {

            fetchMenuDetails(restaurant._id);
        }
    }, [restaurant]);
    useEffect(() => {
        let timer;
        if (addedToCart) {
            timer = setTimeout(() => {
                setAddedToCart(false);
                setSelectedItem('');
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [addedToCart]);

    const handleMenuItemPress = (item) => {
        navigation.navigate('Item', { restaurant, item });
    };



    const renderMenuItem = ({ item }) => {
        const isFromScannedRestaurant = scannedRestaurant && scannedRestaurant.id === restaurant.id;

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
            } else if (scannedRestaurant && scannedRestaurant.id !== restaurant.id) {
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
        // const imageSource = item.image ? { uri: item.image } : require('./assets/menuitem1.png');

        return (
            <TouchableOpacity style={styles.menuItemCard} onPress={() => handleMenuItemPress(item)}>
                <View style={styles.itemImageContainer}>
                    {/* Displaying images for all items */}
                    {item.itemList.map(menuItem => (
                        <Image
                            key={menuItem._id}
                            source={{ uri: menuItem.image }}
                            style={styles.itemImage}
                        />
                    ))}
                </View>
                <View style={styles.itemDetails}>
                    {/* Displaying names for all items */}
                    {item.itemList.map(menuItem => (
                        <View key={menuItem._id}>
                            <Text style={styles.itemName}>{menuItem.name}</Text>
                            <Text style={styles.itemPrice}>{menuItem.price}</Text>
                            <Text style={styles.itemDescription}>{menuItem.description}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity
                    onPress={addToCartHandler}
                    style={[
                        styles.addToCartButton,
                        !isFromScannedRestaurant && styles.disabledButton
                    ]}
                >
                    <MaterialIcons name="add-shopping-cart" size={24} color="#fff" />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                {menuItems.length === 0 && <Text>No menu items available.</Text>}

                <FlatList
                    data={menuItems}

                    renderItem={renderMenuItem}
                    keyExtractor={(item) => item._id} // Assuming each item has a unique _id

                    contentContainerStyle={styles.menuList}
                />
            </View>
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
    restaurantHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    restaurantLogo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    menuList: {
        paddingBottom: 20,
    },
    menuItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 12,
    },
    itemImageContainer: {
        marginRight: 15,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
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
    itemDescription: {
        fontSize: 14,
        color: '#555',
    },
    addToCartButton: {
        backgroundColor: '#eb5b53',
        borderRadius: 20,
        padding: 10,
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

export default RestaurantMenu;


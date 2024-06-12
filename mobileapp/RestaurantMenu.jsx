import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from './CartContext';
import NotificationModal from './NotificationModal';
import QRScanContext from './QRScanContext';
import { AuthContext } from './authcontext';
import { fetchMenuDetails } from './api-restaurant';

const RestaurantMenu = ({ navigation, route }) => {
    const { restaurant } = route.params;
    const { cart, addToCart } = useCart();
    const { isScanned, scannedRestaurant } = useContext(QRScanContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {

        if (restaurant && restaurant._id) {

            fetchMenuData(restaurant._id);
        }
    }, [restaurant]);

    const fetchMenuData = async (restaurantId) => {
        try {
            const data = await fetchMenuDetails(restaurantId, user.token);
            setMenuItems(data);

        } catch (error) {
            console.error('Error fetching menu details:', error.message);
        }
    };

    useEffect(() => {
        let timer;
        if (addedToCart) {
            timer = setTimeout(() => {
                setAddedToCart(false);
                setSelectedItem(null);
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
                Alert.alert(
                    'Invalid Item',
                    'This item is not from the scanned restaurant. Do you want to view the menu of the scanned restaurant?',
                    [
                        {
                            text: 'View Menu',
                            onPress: () => {
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
                setSelectedItem(item);
                addToCart(item);
                setAddedToCart(true);
            }
        };

        return (
            <TouchableOpacity style={styles.menuItemCard} onPress={() => handleMenuItemPress(item)}>
                <View style={styles.itemImageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.itemImage}
                    />
                </View>
                <View style={styles.itemDetails}>
                    <View>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
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

    // Group menu items by category
    const groupedMenuItems = menuItems.reduce((acc, item) => {
        const categoryTitle = item.categoryTitle || 'Uncategorized'; // Default category title if not provided
        if (!acc[categoryTitle]) {
            acc[categoryTitle] = [];
        }
        acc[categoryTitle] = [...acc[categoryTitle], ...item.itemList];
        return acc;
    }, {});

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {Object.entries(groupedMenuItems).map(([category, items]) => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryHeading}>{category}</Text>
                        <FlatList
                            data={items}
                            renderItem={renderMenuItem}
                            keyExtractor={(item) => item._id}
                            scrollEnabled={false} // Disable scrolling for FlatList
                        />
                    </View>
                ))}
            </ScrollView>
            <Footer navigation={navigation} activeIcon="home" />

            {addedToCart && (
                <NotificationModal
                    message={selectedItem ? `Added ${selectedItem.name} to cart!` : ''}
                    closeModal={() => { setAddedToCart(false); setSelectedItem(null); }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    categoryContainer: {
        marginBottom: 10,
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
    disabledButton: {
        backgroundColor: 'grey',
        opacity: 0.5,
    },
    categoryHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
});

export default RestaurantMenu;

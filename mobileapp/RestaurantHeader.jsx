import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRScanContext from './QRScanContext';
const RestaurantHeader = ({ restaurant }) => {
    const navigation = useNavigation();

    const goToMenu = () => {
        navigation.navigate('RestaurantMenu', { restaurant });
    };
    const { scannedRestaurant } = useContext(QRScanContext);

    const imageUrl = scannedRestaurant.logo;
    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.restaurantLogo} />
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <TouchableOpacity onPress={goToMenu} style={styles.menuButton}>
                <Text style={styles.menuButtonText}>Menu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
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
        flex: 1,
    },
    menuButton: {
        backgroundColor: '#eb5b53',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    menuButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default RestaurantHeader;

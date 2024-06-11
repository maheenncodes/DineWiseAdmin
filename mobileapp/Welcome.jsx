// Welcome.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import QRScanContext from './QRScanContext';
import { navigation } from '@react-navigation/native';

const Welcome = ({ navigation }) => {
    const { scannedRestaurant } = useContext(QRScanContext);

    const imageUrl = scannedRestaurant.logo
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Image
                    source={{ uri: imageUrl }} // Assuming 'image' is part of restaurant data
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.welcomeText}>Welcome to Restaurant "{scannedRestaurant.name}"</Text>

                <TouchableOpacity style={styles.viewMenuButton} onPress={() => navigation.navigate('RestaurantMenu', scannedRestaurant._id)}>
                    <Text style={styles.viewMenuButtonText}>View Menu</Text>
                </TouchableOpacity>
            </View>
            <Footer navigation={navigation} activeIcon="solution1" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbf7f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200, // Adjust size as needed
        height: 200, // Adjust size as needed
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tableText: {
        fontSize: 18,
        marginBottom: 20,
    },
    viewMenuButton: {
        backgroundColor: '#eb5b53',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
    },
    viewMenuButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Welcome;

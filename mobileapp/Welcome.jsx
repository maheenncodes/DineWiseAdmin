import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Header from './Header';
import Footer from './Footer';
import QRScanContext from './QRScanContext';

const Welcome = () => {
    const { scannedRestaurant } = useContext(QRScanContext);
    const navigation = useNavigation(); // Use the useNavigation hook here

    const imageUrl = scannedRestaurant.logo;
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

                <TouchableOpacity style={styles.viewMenuButton} onPress={() => navigation.navigate('RestaurantMenu', { restaurant: scannedRestaurant })}>
                    <Text style={styles.viewMenuButtonText}>View Menu</Text>
                </TouchableOpacity>
            </View>
            <Footer navigation={navigation} activeIcon="home" />
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
        bottom: 50,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    welcomeText: {
        width: 350,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
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

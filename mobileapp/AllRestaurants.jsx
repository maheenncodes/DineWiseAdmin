import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { AuthContext } from './authcontext'; // Import AuthContext
import axios from 'axios'; // Import axios for making HTTP requests
import Footer from './Footer';
import Header from './Header';

const AllRestaurants = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Access user authentication state from context
  const [restaurants, setRestaurants] = useState([]);
  const API_BASE_URL = 'http://192.168.0.100:5000';

  useEffect(() => {
    if (user) {
      fetchRestaurants();
    } else {
      console.error('User not logged in'); // Handle case where user is not logged in
    }
  }, [user]); // Execute useEffect when user authentication state changes

  const fetchRestaurants = async () => {
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

      // Make the authenticated request to fetch restaurants
      const response = await axios.get(`${API_BASE_URL}/api/restaurants/view_restaurants_list`, config);

      setRestaurants(response.data);

    } catch (error) {
      console.error('Error fetching restaurants:', error.message);
      // Detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message);
      }
    }
  };



  const navigateToMenu = (item) => {

    navigation.navigate('RestaurantMenu', { restaurant: item });
  };


  const renderRestaurantItem = ({ item }) => {
    const imageUrl = item.logo ? { uri: item.logo } : { uri: 'default_image_uri_here' };

    return (
      <TouchableOpacity style={styles.restaurantCard} onPress={() => navigateToMenu(item)}>
        <Image source={{ uri: imageUrl }} style={styles.restaurantImage} resizeMode="cover" />
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDescription}>Timings: {item.openingHours} - {item.closingHours}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={restaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.restaurantList}
        columnWrapperStyle={styles.columnWrapper}
      />
      <Footer navigation={navigation} activeIcon="home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf7f5',
  },
  restaurantList: {
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 1,
    width: '100%',
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    width: '48%',
    maxWidth: 300,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
    marginBottom: 5,
    borderRadius: 8,
  },
  restaurantName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  restaurantDescription: {
    fontSize: 12,
    color: '#777',
  },
});

export default AllRestaurants;

import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Make sure to install expo-vector-icons
import Header from './Header';
import Footer from './Footer';


const AllRestaurants = ({ navigation }) => {

const API_BASE_URL = 'http://192.168.0.106:5000'; 
const [restaurants, setRestaurants] = useState([]);

  
const fetchRestaurants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/getAllRestaurants`);
    
    if (!response.ok) {
     
      // Handle non-successful response (e.g., show an error message)
      console.error(`HTTP error! Status: ${response.status}`);
      return;
    }

    const data = await response.json();
    setRestaurants(data);
  } catch (error) {
    console.error(error);
  }
};


  const navigateToMenu = (restaurantId) => {
    
    if (restaurantId) {
    //  navigation.navigate('RestaurantMenu', { restaurantId });
      // Example of navigating to RestaurantMenu with a restaurant object
      navigation.navigate('RestaurantMenu', {
        restaurant: {
          
          _id: restaurantId,
         
          // Include any other restaurant info you need
        }
      });

    }
  };

  const renderrestaurantItem = ({ item }) => {
    // Assuming the image URL is stored in an array, we take the first one for display
    const imageUrl = item.images && item.images.length > 0 ? { uri: item.images[0] } : defaultImage;
    
    return (
      <TouchableOpacity style={styles.restaurantCard} onPress={() => navigateToMenu(item._id)}>
        <Image source={{ uri: imageUrl }} style={styles.restaurantImage} resizeMode="cover" />
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDescription}>Timings: {item.openingHours}</Text>
      </TouchableOpacity>
    );
  };
 
 
  useEffect(() => {
    fetchRestaurants();
  }, []);



  return (
    <View style={styles.container}>
    <Header navigation={navigation} />
    
    <FlatList
      data={restaurants}
      renderItem={renderrestaurantItem}
      keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
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
    backgroundColor: '#fbf7f5',
    flex: 1,


  },
  content: {
    flex: 1,

    paddingTop: 20,
  },

  restaurantList: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 10,

    paddingHorizontal: 8,
    flexDirection: 'column', // Ensure vertical direction
    flexGrow: 0, // Restrict growing horizontally
    width: '100%', // Ensure the list takes full width
    justifyContent: 'space-between'
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center', // Center the search input
  },
});


export default AllRestaurants;

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Image, FlatList, ScrollView } from 'react-native';
import Header from './Header';
import { AntDesign } from '@expo/vector-icons';
import QRScanContext from './QRScanContext';
import Footer from './Footer';
import { AuthContext } from './authcontext'; // Import AuthContext
import { fetchAllRestaurants } from './api-restaurant';
const CustomerHomepage = ({ navigation }) => {
  const { isScanned, setIsScanned } = useContext(QRScanContext);

  const { user } = useContext(AuthContext); // Access user authentication state from context
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (user) {
      fetchRestaurants();
    } else {
      console.error('User not logged in');
    }
  }, [user]);

  const fetchRestaurants = async () => {
    try {
      const data = await fetchAllRestaurants(user.token); // Call fetchAllRestaurants function
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error.message);

    }
  };

  const popularDishes = [
    {
      id: '1',
      name: 'Alfredo Pasta',
      rest: 'Lili by Deja',
      description: 'Creamy pasta with parmesan cheese and white sauce',
      price: 12.99,
      image: require('./assets/dish1.jpg')
    },
    {
      id: '2',
      name: 'Corden Blue',
      rest: 'Cafe Beurit',
      description: 'Chicken breast stuffed with ham and cheese, breaded and fried',
      price: 15.49,
      image: require('./assets/dish2.jpg')
    },
    {
      id: '3',
      name: 'Loaded Fries',
      rest: 'Meat the Cheese',
      description: 'Crispy fries loaded with cheese, bacon, and jalapenos',
      price: 9.99,
      image: require('./assets/dish3.jpg')
    },
    {
      id: '4',
      name: 'Chicken Parmesan',
      rest: 'El Momento',
      description: 'Breaded chicken topped with marinara sauce and melted cheese',
      price: 13.75,
      image: require('./assets/dish4.jpg')
    },
    // ... other restaurants
  ];


  // ... other functions

  const navigateToMenu = (restaurant) => {
    if (restaurant) {
      navigation.navigate('RestaurantMenu', { restaurant });
    }
  };

  const navigateToItem = (dish) => {
    if (dish) {
      navigation.navigate('Item', { item: dish });

    }
  };

  const handleScan = () => {
    navigation.navigate('QRScanner')
    //add open menu here
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scrollView}>

        {/* Main content */}
        <View style={styles.container}>
          <ImageBackground
            source={require('./assets/download.jpg')} // Replace with your local image path
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>Scan QR Code to access the table</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleScan()}>
                <Text style={styles.buttonText}>Scan me</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <View style={styles.popularSection}>
            <Text style={styles.popularHeading}>Popular Dishes</Text>

          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularDishes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToItem(item)}>
                <View style={styles.dishesCard}>
                  <Image source={item.image} style={styles.restaurantImage} />
                  <Text style={styles.dishname}>{item.name}</Text>
                  <Text style={styles.restaurantName}>{item.rest}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.restaurantList}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.popularSection}>
            <Text style={styles.popularHeading}>Popular Restaurants</Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => navigation.navigate('AllRestaurants')}
            >
              <Text style={styles.exploreButtonText}>Explore More</Text>
              <AntDesign name="right" size={16} color="black" />
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={restaurants}
            keyExtractor={(item) => item._id.toString()} // Convert id to string if it's not already a string
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToMenu(item)}>
                <View style={styles.restaurantCard} key={item.id}>
                  <Image source={{ uri: item.logo }} style={styles.restaurantImage} />
                  <Text style={styles.restName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.restaurantList}
          />

        </View>
        <View style={styles.betweenComponents}>

        </View>
      </ScrollView>
      <Footer navigation={navigation} activeIcon="home" />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf7f5', // Add the desired background color
    borderRadius: 0, // Adjust the borderRadius as necessary
    overflow: 'hidden', // This will ensure the ImageBackground respects the borderRadius
    flex: 1,
    position: 'relative',
  },
  content: {
    backgroundColor: '#fbf7f5', // Add the same background color here
  },



  backgroundImage: {
    width: '100%', // Set width according to your specific needs
    height: 230, // Set height according to your specific needs
    justifyContent: 'center', // Centers the children components
    alignItems: 'center', // Centers the children components
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    width: '100%',
    height: '100%',
    justifyContent: 'center', // Centers the title and button vertically
    alignItems: 'center', // Centers the title and button horizontally
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 26, // Adjust the size as needed
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16, // Adds a margin below the title
    justifyContent: 'center', // Centers the title and button vertically
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,

  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20, // Fully rounded corners for a pill shape
    paddingVertical: 10,
    paddingHorizontal: 20,

  },
  buttonText: {
    color: '#e74c3c', // Adjust the color to match your design
    fontSize: 18, // Adjust the size as needed
    fontWeight: 'bold',
    textAlign: 'center',
  },

  popularSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 14,
    marginBottom: 10
  },
  popularHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  restaurantList: {
    marginTop: 10,
    marginBottom: 20,

  },


  restaurantCard: {
    marginRight: 10,
    marginLeft: 18,
    width: 200,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingBottom: 25,
    paddingTop: 25,
    marginBottom: 30,


  },

  dishesCard: {
    marginRight: 10,
    marginLeft: 18,
    width: 200,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingBottom: 25,
    paddingTop: 25,


  },
  restaurantImage: {
    width: '90%',
    height: '80%',
    // borderRadius: 10,
    // marginBottom: 10,
  },

  restName: {
    paddingTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  restaurantName: {
    paddingTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dishname: {
    paddingTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },


  betweenComponents: {
    flexDirection: 'col',
    justifyContent: 'space-between',
  },

  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,

  },
  exploreButtonText: {
    marginRight: 5,
    fontSize: 12,
  }
});

export default CustomerHomepage;




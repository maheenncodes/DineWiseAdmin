import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import QRScanContext from './QRScanContext';
import RestaurantHeader from './RestaurantHeader';
import { StatusBar } from 'expo-status-bar';
import UserDropdownModal from './UserDropdownModal';

const Header = ({ navigation }) => {
  const [showUserModal, setshowUserModal] = useState(false); // Set initial state to false
  const [searchQuery, setSearchQuery] = useState('');
  const { isScanned, setIsScanned, scannedRestaurant } = useContext(QRScanContext);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <View>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#eb5b53" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => setshowUserModal(true)}>
            <View style={styles.profileIcon}>
              <MaterialIcons name="person" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <UserDropdownModal
          visible={showUserModal}
          onClose={() => setshowUserModal(false)}
        />
      </View>
      {isScanned && (
        <RestaurantHeader restaurant={scannedRestaurant} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf7f5',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 20,
    backgroundColor: '#eb5b53',
    paddingTop: 40,
  },
  backIcon: {
    marginRight: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
  },
  searchButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  profileIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;

import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { OrderContext } from './OrderContext';
import QRScanContext from './QRScanContext';

const Footer = ({ navigation, activeIcon }) => {
  const { ongoingOrder } = useContext(OrderContext);
  const { isScanned, setIsScanned, scannedRestaurant } = useContext(QRScanContext);

  const handleIconPress = (iconName) => {
    if (iconName === 'message1') {
      navigation.navigate('ChatBot');
    }

    if (iconName === 'home') {
      navigation.navigate('CustomerHomepage');
    }

    if (iconName === 'shoppingcart') {
      if (!isScanned) {
        navigation.navigate('CartScanQRScreen');
      } else if (ongoingOrder) {
        navigation.navigate('OrderStatus');
      } else {
        navigation.navigate('Cart');
      }
    }
    if (iconName === 'solution1') {
      if (isScanned) {
        navigation.navigate('TableMade');
      } else {
        navigation.navigate('Table');
      }
    }
  };

  const renderIcon = (iconName) => {
    const isActive = activeIcon === iconName;

    return (
      <TouchableOpacity onPress={() => handleIconPress(iconName)}>
        <View style={styles.iconWrapper}>
          <View style={[styles.iconContainer, isActive && styles.activeIcon]}>
            {isActive && <View style={styles.innerCircle} />}
            <AntDesign
              name={iconName}
              size={isActive ? 30 : 24}
              color={isActive ? '#fbf7f5' : 'black'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={[styles.container, styles.footer]}>

      {renderIcon('home')}
      {renderIcon('shoppingcart')}
      {renderIcon('message1')}
      {renderIcon('solution1')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf7f5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fbf7f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',

  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
  },
  activeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    backgroundColor: '#eb5b53',
    borderRadius: 30,
    width: 50,
    height: 50,
    position: 'absolute',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconWrapper: {
    padding: 10, // Adjust the padding as needed for the touchable space
  },
});

export default Footer;
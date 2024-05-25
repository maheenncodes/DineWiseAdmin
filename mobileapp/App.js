import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './authcontext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QRScanProvider } from './QRScanContext';
import { CartProvider } from './CartContext';
import { OrderProvider } from './OrderContext';
import { TableDataProvider } from './TableDataContext';
import HeaderComponent from './Header';
import UserDropdownModal from './UserDropdownModal'; // Import UserDropdownModal component
import LoginScreen from './LoginPage';
import SignUpScreen from './SignUp';
import HomePage from './HomePage';
import CustomerHomepage from './CustomerHomepage';
import AllRestaurants from './AllRestaurants';
import ScanQRScreen from './ScanQRScreen';
import Cart from './Cart';
import ChatBot from './ChatBot';
import RestaurantMenu from './RestaurantMenu';
import Item from './Item';
import TableMade from './TableMade';
import RestaurantHeader from './RestaurantHeader';
import NotificationModal from './NotificationModal';
import QRScanner from './QRScanner';
import OrderStatus from './OrderStatus';
import Payment from './Payment';
import MemberDetails from './MemberDetails';
import CartScanQRScreen from './CartScanQRScreen';
import UpdateUser from './Updateuser';
import Welcome from './Welcome';
import WebSocketManager from './WebSocketManager'; // Import WebSocketManager

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <TableDataProvider>
        <AuthProvider>
          <OrderProvider>
            <QRScanProvider>
              <CartProvider>
                <NavigationContainer>
                  <WebSocketManager /> {/* Include WebSocketManager here */}
                  <Stack.Navigator
                    initialRouteName="HomePage"
                    screenOptions={{
                      headerShown: false,
                      headerStatusBarHeight: 0,
                    }}
                  >
                    {/* Your screen components */}
                  </Stack.Navigator>
                  <UserDropdownModal visible={false} />
                </NavigationContainer>
              </CartProvider>
            </QRScanProvider>
          </OrderProvider>
        </AuthProvider>
      </TableDataProvider>
    </SafeAreaProvider>
  );
}

export default App;

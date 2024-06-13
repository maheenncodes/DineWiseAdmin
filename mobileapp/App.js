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
import WebSocketManager from './WebSocketManager'; // Import WebSocketManager component
import OrderStatusProgress from './OrderStatusProgress';
import MemberStatus from './MemberStatus';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>

      <AuthProvider>
        <TableDataProvider>
          <OrderProvider>
            <QRScanProvider>
              <CartProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName="HomePage"
                    screenOptions={{
                      headerShown: false,
                      headerStatusBarHeight: 0,
                    }}
                  >
                    <Stack.Screen name="WebSocketManager" component={WebSocketManager} />
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="HomePage" component={HomePage} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="UpdateUser" component={UpdateUser} />
                    <Stack.Screen
                      name="CustomerHomepage"
                      component={CustomerHomepage}
                    />
                    <Stack.Screen
                      name="AllRestaurants"
                      component={AllRestaurants}
                    />
                    <Stack.Screen
                      name="HeaderComponent"
                      component={HeaderComponent}
                    />
                    <Stack.Screen name="Table" component={ScanQRScreen} />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="ChatBot" component={ChatBot} />
                    <Stack.Screen
                      name="RestaurantMenu"
                      component={RestaurantMenu}
                    />
                    <Stack.Screen name="Item" component={Item} />
                    <Stack.Screen name="TableMade" component={TableMade} />
                    <Stack.Screen
                      name="RestaurantHeader"
                      component={RestaurantHeader}
                    />
                    <Stack.Screen
                      name="NotificationModal"
                      component={NotificationModal}
                    />
                    <Stack.Screen name="QRScanner" component={QRScanner} />
                    <Stack.Screen
                      name="OrderStatus"
                      component={OrderStatus}
                    />
                    <Stack.Screen name="Payment" component={Payment} />
                    <Stack.Screen
                      name="MemberDetails"
                      component={MemberDetails}
                    />
                    <Stack.Screen
                      name="CartScanQRScreen"
                      component={CartScanQRScreen}
                    />
                    <Stack.Screen
                      name="OrderStatusProgress"
                      component={OrderStatusProgress}
                    />
                    <Stack.Screen
                      name="MemberStatus"
                      component={MemberStatus}
                    />
                  </Stack.Navigator>
                  <UserDropdownModal visible={false} />
                </NavigationContainer>
              </CartProvider>
            </QRScanProvider>
          </OrderProvider>
        </TableDataProvider>
      </AuthProvider>

    </SafeAreaProvider>
  );
}

export default App;
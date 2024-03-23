import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, Alert, ScrollView } from 'react-native';
import { loginUser } from './api-user'; // Import the loginUser function

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log(`Email: ${email}, Password: ${password}`);
    if (!email || !password) {
      Alert.alert('Login Error', 'Email or password cannot be empty.');
      return;
    }

    // Email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    try {
      const response = await loginUser({ email, password });
      navigation.navigate('CustomerHomepage');
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        // If the error has a response object with a data property containing a message
        Alert.alert('Login Error', error.response.data.message);
      } else {
        // If the response object or its properties are not available, show a generic error message
        Alert.alert('Login Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')} // Adjust the path to where your logo is located
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerText}>DineWise</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={newText => setEmail(newText)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or Login with</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity style={styles.googleButton}>
          <Image source={require('./assets/google.png')} style={styles.googleLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerText}>Don’t have an account? Register Now</Text>
        </TouchableOpacity>
      </View >
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1, // Make sure ScrollView takes up the entire screen
  },
  container: {
    backgroundColor: '#fbf7f5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50, // Add some padding to the bottom to ensure content is not hidden behind the keyboard
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100, // Set the width as per your design
    height: 100, // Set the height as per your design
    // If your logo is not a square, adjust the width and height accordingly
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  forgotPasswordText: {
    justifyContent: 'flex-start',
    marginBottom: 20,
    color: 'blue',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    marginBottom: 20,
  },
  googleLogo: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  googleButtonText: {
    color: 'black',
    fontSize: 16,
  },
  loginButton: {
    width: '80%',
    padding: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    marginTop: 20,
  },
  dividerText: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  registerText: {
    color: 'blue',
    marginTop: 30,
  },
});

export default LoginScreen;

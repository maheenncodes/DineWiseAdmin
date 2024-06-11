import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { AuthContext } from './authcontext'; // Import the AuthContext

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { registerUser } = useContext(AuthContext); // Access the login function from the context

  const handleRegister = async () => {
    // Basic input validations...
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
      await registerUser({ name, email, password });
      // Handle successful registration...
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('CustomerHomepage');
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle errors...
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerText}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>Already have an account? Login Now</Text>
        </TouchableOpacity>
      </View>
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

  },
  logoContainer: {
    paddingTop: 0, // Add padding at the top inside the SafeAreaView
    paddingBottom: 20, // Optional: Add some padding at the bottom for spacing
    alignItems: 'center', // Center the logo horizontally
    width: '100%', // Ensure the container takes the full width
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // If your logo is a circle, this will make it round
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
  registerButton: {
    marginTop: 20,
    width: '80%',
    padding: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signInText: {
    paddingTop: 30,
    color: 'blue',
  },
});

export default SignUpScreen;
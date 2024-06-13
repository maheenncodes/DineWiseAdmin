import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.halfPage}>
        <View style={styles.circleContainer}>
          <Image
            source={require('./assets/homepage.png')}
            style={styles.circularImage}
          />
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf7f5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfPage: {
    height: '35%',
    width: '100%',
    backgroundColor: '#FADADD',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  circleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 200 / 2,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 240,
  },
  circularImage: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    marginBottom: 50,
    marginTop: 420,
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    width: '70%',
    alignItems: 'center',
    height: '30%',
  },
  loginButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
  signUpButton: {
    borderColor: 'red',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomePage;
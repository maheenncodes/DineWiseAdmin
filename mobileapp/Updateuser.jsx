import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateUser } from './api-user'; // Import updateUser function from api-user.js
import Header from './Header';
import Footer from './Footer';

const UpdateUserScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');

    const handleUpdateUser = async () => {
        try {
            const response = await updateUser({ name, email, phone, bio, photo });
            console.log('User updated:', response);
            // Logic to handle successful update
        } catch (error) {
            console.error('Update failed:', error.message);
            // Logic to handle update failure
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.containerupdate}>

                <Text>Update User Data</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Bio"
                    value={bio}
                    onChangeText={setBio}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Photo"
                    value={photo}
                    onChangeText={setPhoto}
                />
                <Button title="Update" onPress={handleUpdateUser} />
                <Footer navigation={navigation} activeIcon="shoppingcart" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,

    },
    containerupdate: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default UpdateUserScreen;

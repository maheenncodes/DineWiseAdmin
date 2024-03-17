import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const TableMade = ({ navigation }) => {
    const [members, setMembers] = useState([
        {
            id: 1,
            name: 'John Doe',
            image: require('./assets/person1.png'),
            bill: 24,
            orderedItems: [
                { id: 1, name: 'Chicken Fajita Sandwich', price: 10, image: require('./assets/item1.jpg'), description: 'Grilled chicken strips, onions, mozzarella cheese, bell pepper and avocado sauce.' },
                { id: 2, name: 'Chicken Chilli Dry', price: 14, image: require('./assets/item2.jpg'), description: 'Tender fried chicken bites tossed in a super aromatic sweet, spicy and slightly tangy chili.' },
                // Add more ordered items from menuItems2 for John Doe if needed
            ],
        },
        {
            id: 2,
            name: 'Jane Smith',
            image: require('./assets/person2.png'),
            bill: 27,
            orderedItems: [
                { id: 3, name: 'Chicken Chilli Dry', price: 14, image: require('./assets/item2.jpg'), description: 'Tender fried chicken bites tossed in a super aromatic sweet, spicy and slightly tangy chili.' },
                { id: 4, name: 'Chicken Malai Boti', price: 13, image: require('./assets/item3.jpg'), description: 'Juicy and tender chicken malai boti marinated with cream cheese and yogurt.' },
                // Add more ordered items from menuItems2 for Jane Smith if needed
            ],
        },
        {
            id: 3,
            name: 'Alice Johnson',
            image: require('./assets/person3.png'),
            bill: 10,
            orderedItems: [
                { id: 5, name: 'Chicken Fajita Sandwich', price: 10, image: require('./assets/item1.jpg'), description: 'Grilled chicken strips, onions, mozzarella cheese, bell pepper and avocado sauce.' },
                // Add more ordered items from menuItems2 for Alice Johnson if needed
            ],
        },
        {
            id: 4,
            name: 'Bob Brown',
            image: require('./assets/person4.jpg'),
            bill: 27,
            orderedItems: [
                { id: 6, name: 'Chicken Chilli Dry', price: 14, image: require('./assets/item2.jpg'), description: 'Tender fried chicken bites tossed in a super aromatic sweet, spicy and slightly tangy chili.' },
                { id: 7, name: 'Chicken Malai Boti', price: 13, image: require('./assets/item3.jpg'), description: 'Juicy and tender chicken malai boti marinated with cream cheese and yogurt.' },
                // Add more ordered items from menuItems2 for Bob Brown if needed
            ],
        },
    ]);

    useEffect(() => {
        calculateTotalBill();
    }, []); // Run once on component mount

    const calculateTotalBill = () => {
        BILL = currentUser.bill;
        members.map((member) => (BILL += member.bill));
        return BILL;

    };

    const currentUser = {
        id: 1,
        name: 'Jane Doe (You)',
        image: require('./assets/person0.png'), // Change this to the user's actual profile image
        email: 'john@example.com',
        bill: 28,
        // Add more user details as needed
    };

    const handlePayBill = () => {
        // Logic to navigate to the payment screen or process the payment
        // For example:
        navigation.navigate('Payment');
    };
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.profileContainer}>
                <Image source={currentUser.image} style={styles.profileImage} />
                <View style={styles.profileDetails}>
                    <Text style={styles.profileName}>{currentUser.name}</Text>
                    <Text style={styles.profileEmail}>Total Bill: ${currentUser.bill}</Text>
                    {/* Add more user details here */}
                </View>
            </View>
            <ScrollView>
                {members.map((member) => (
                    <TouchableOpacity
                        key={member.id}
                        style={styles.memberContainer}
                        onPress={() => navigation.navigate('MemberDetails', { member })}
                    >
                        <View style={styles.member}>
                            <Image source={member.image} style={styles.memberImage} />
                            <View style={styles.memberDetails}>
                                <Text style={styles.memberName}>{member.name}</Text>
                                <Text style={styles.memberBill}>Total Bill: ${member.bill}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                    Total Bill: ${calculateTotalBill()}
                </Text>
                <TouchableOpacity style={styles.payButton} onPress={handlePayBill}>
                    <Text style={styles.payButtonText}>Pay Bill</Text>
                </TouchableOpacity>
            </View>
            <Footer navigation={navigation} activeIcon="solution1" />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,

    },
    membersContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 20,
    },
    member: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Aligns the bill to the right
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,

    },
    memberTotalBill: {
        fontWeight: 'bold',
        color: '#555',
    },
    memberImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    memberDetails: {
        flex: 1,
    },
    memberName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    memberBill: {
        color: '#555',
    },
    totalContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
    },
    totalText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    payButton: {
        backgroundColor: '#eb5b53',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    profileDetails: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileBill: {
        color: '#555',
    },
});

export default TableMade;

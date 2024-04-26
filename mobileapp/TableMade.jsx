import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './authcontext';

const TableMade = ({ }) => {
    const navigation = useNavigation();
    const [members, setMembers] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchMembersData();
    }, []); // Run once on component mount

    const fetchMembersData = async () => {
        try {
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            // Hardcoded restaurantId and tableId for now
            const restaurantId = '65f6b800ebfe51ea62ba5e45';
            const tableId = '65fbab5aa1734426bf68554c';
            const response = await axios.get(`http://10.104.130.5/api/orders/view_all?restaurantId=${restaurantId}&tableId=${tableId}`, config);
            const membersData = response.data;

            // Calculate total bill and update state
            let total = 0;
            membersData.forEach(member => {
                total += member.totalPrice;
            });
            setTotalBill(total);

            // Update state with members' data
            setMembers(membersData);
            console.log('Members data:', membersData);
        } catch (error) {
            console.error('Error fetching members data:', error);
            // Handle error, show error message, etc.
        }
    };

    const handlePayBill = () => {
        // Logic to navigate to the payment screen or process the payment
        // For example:
        navigation.navigate('Payment');
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <ScrollView>
                {members.map((member, index) => (
                    <TouchableOpacity
                        key={index} // Use index as key temporarily, replace with a unique ID when available
                        style={styles.memberContainer}
                        onPress={() => navigation.navigate('MemberDetails', { member })}
                    >
                        <View style={styles.member}>
                            <Image source={{ uri: member.photo }} style={styles.memberImage} />
                            <View style={styles.memberDetails}>
                                <Text style={styles.memberName}>{member.user}</Text>
                                <Text style={styles.memberStatus}>
                                    Status: {member.status === 'payment_pending' ? 'Payment Pending' : member.status}
                                </Text>
                                <Text style={styles.memberTotalPrice}>Total Price: ${member.totalPrice}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                    Total Bill: ${totalBill}
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
    memberContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    member: {
        flexDirection: 'row',
        alignItems: 'center',
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
    memberStatus: {
        color: '#555',
    },
    memberTotalPrice: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    memberOrderedItemsTitle: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    itemContainer: {
        marginVertical: 5,
    },
    itemName: {
        fontSize: 16,
    },
    itemPrice: {
        color: '#555',
    },
    itemQuantity: {
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
});

export default TableMade;

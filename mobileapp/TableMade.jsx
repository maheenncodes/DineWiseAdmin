import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AuthContext } from './authcontext';
import { fetchMembersData, getOrderStatus } from './api-table';
import QRScanContext from './QRScanContext';
import TableDataContext from './TableDataContext'; // Correct import
import { user } from './authcontext';

const TableMade = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { user } = useContext(AuthContext);
    const { scannedRestaurant, scannedTableId, order } = useContext(QRScanContext);
    const { dataLoaded, members, totalBill, setTableDataLoaded, updateTableData } = useContext(TableDataContext);
    const [orderStatus, setOrderStatus] = useState(null);

    useEffect(() => {
        //  updateTableData(user.token, scannedRestaurant._id, scannedTableId);
        console.log('order', order)

        const loadData = async () => {
            console.log('Data loaded:', dataLoaded);
            if (!dataLoaded && scannedRestaurant && scannedTableId) {
                await updateTableData(user.token, scannedRestaurant._id, scannedTableId);
                setTableDataLoaded(true);
            }
        };

        const loadStatus = async () => {
            if (order) {
                const status = await getOrderStatus(user.token, order);
                console.log('Order status:', status);
                setOrderStatus(status);
            }
        };

        loadData();
        loadStatus();
    }, [scannedRestaurant, scannedTableId, dataLoaded, user.token, updateTableData]);

    const handlePayBill = () => {
        // Logic to navigate to the payment screen or process the payment
        navigation.navigate('Payment');
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {/* Show order status at the top */}
            {orderStatus && (
                <View style={styles.orderStatusContainer}>
                    <Text style={styles.orderStatusText}>Order Status: {orderStatus}</Text>
                </View>
            )}
            <ScrollView>
                {members.map((member) => (
                    <TouchableOpacity
                        key={member.userId} // Use a unique key instead of index
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
                <Text style={styles.totalText}>Total Bill: ${totalBill}</Text>
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
    orderStatusContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    orderStatusText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
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

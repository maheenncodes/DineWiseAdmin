import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './authcontext';
import QRScanContext from './QRScanContext';
import TableDataContext from './TableDataContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrderStatusProgress from './OrderStatusProgress';
import MemberStatus from './MemberStatus';

const TableMade = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { scannedRestaurant, scannedTableId, order } = useContext(QRScanContext);
    const {
        dataLoaded,
        members,
        totalBill,
        setTableDataLoaded,
        updateTableData,
        loadOrderStatus,
        isStatusLoaded,
        orderStatus,
        totalPaid, // New variable
        totalVerified, // New variable
        setTableStatusLoaded
    } = useContext(TableDataContext);

    useEffect(() => {
        const loadData = async () => {
            if (!dataLoaded && scannedRestaurant && scannedTableId) {
                await updateTableData(user.token, scannedRestaurant._id, scannedTableId);
                setTableDataLoaded(true);
            }
        };

        const loadStatus = async () => {
            if (order && !isStatusLoaded) {
                await loadOrderStatus(user.token, order);
                console.log('Order Status Loaded', orderStatus);
                setTableStatusLoaded(true);
            }
        };

        loadData();
        loadStatus();

    }, [scannedRestaurant, scannedTableId, dataLoaded, user.token, updateTableData, order, isStatusLoaded, loadOrderStatus, setTableDataLoaded]);

    const handlePayBill = () => {
        navigation.navigate('Payment');
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {orderStatus !== null && (
                <View style={styles.orderStatusContainer}>
                    <OrderStatusProgress currentStatus={orderStatus} orderId={order} />
                </View>
            )}
            <ScrollView>
                {members.map((member) => (
                    <TouchableOpacity
                        key={member.userId}
                        style={styles.memberContainer}
                        onPress={() => navigation.navigate('MemberDetails', { member })}
                    >
                        <View style={styles.member}>
                            <Image source={{ uri: member.photo }} style={styles.memberImage} />
                            <View style={styles.memberDetails}>
                                <Text style={styles.memberName}>{member.user}</Text>
                                <MemberStatus member={member} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Bill: ${totalBill}</Text>
                <Text style={styles.totalText}>Total Paid: ${totalPaid}</Text>
                <Text style={styles.totalText}>Total Verified: ${totalVerified}</Text>
                <Text style={styles.totalText}>Total Left: ${totalBill - totalVerified}</Text>

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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
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
        color: '#333',
    },
    memberStatus: {
        color: '#555',
        marginVertical: 2,
    },
    paymentDone: {
        color: 'green',
    },
    paymentPending: {
        color: 'red',
    },
    paymentVerified: {
        color: 'green',
    },
    paymentUnverified: {
        color: 'red',
    },
    memberTotalPrice: {
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
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
        backgroundColor: '#fff',
    },
    totalText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
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
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './authcontext';
import QRScanContext from './QRScanContext';
import TableDataContext from './TableDataContext';

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
        totalPaid,
        totalVerified,
        setTableStatusLoaded,
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
                setTableStatusLoaded(true);
            }
        };

        loadData();
        loadStatus();
    }, [scannedRestaurant, scannedTableId, dataLoaded, user.token, updateTableData, order, isStatusLoaded, loadOrderStatus, setTableDataLoaded]);

    const handlePayBill = () => {
        navigation.navigate('Payment');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new':
                return '#007bff'; // Blue
            case 'preparing':
                return '#ffa500'; // Orange
            case 'served':
                return '#28a745'; // Green
            case 'cancelled':
                return '#dc3545'; // Red
            case 'payment_pending':
                return '#ffc107'; // Yellow
            case 'completed':
                return '#800080'; // Purple
            default:
                return '#333'; // Default color
        }
    };

    const renderMemberStatus = (member) => {
        const paymentStatusColor = member.paymentDone ? '#28a745' : '#dc3545'; // Green for paid, Red for unpaid
        const paymentVerifiedColor = member.paymentVerified ? '#28a745' : '#dc3545'; // Green for verified, Red for unverified

        return (
            <View style={styles.memberDetails}>
                <Text style={styles.memberName}>{member.user}</Text>
                <Text style={styles.memberStatus}>Status: <Text style={{ color: getStatusColor(member.status) }}>{member.status}</Text></Text>
                <Text style={[styles.memberStatus, { color: paymentStatusColor }]}>
                    Payment Done: {member.paymentDone ? 'Yes' : 'No'}
                </Text>
                <Text style={[styles.memberStatus, { color: paymentVerifiedColor }]}>
                    Payment Verified: {member.paymentVerified ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.memberStatus}>Total Paid: ${member.totalPrice}</Text>
                <Text style={styles.memberStatus}>Total Verified: ${member.paymentVerified ? member.totalPrice : 0}</Text>
                <Text style={styles.memberStatus}>Total Left: ${member.paymentVerified ? '0' : member.totalPrice}</Text>
                <Text style={styles.memberTotalPrice}>Total Price: ${member.totalPrice}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {orderStatus !== null && (
                <View style={styles.orderStatusContainer}>
                    <Text style={styles.orderStatusText}>Order Status: <Text style={{ color: getStatusColor(orderStatus) }}>{orderStatus}</Text></Text>
                </View>
            )}
            <ScrollView>
                {members.map((member) => (
                    <TouchableOpacity
                        key={member.userId} // Unique key
                        style={styles.memberContainer}
                        onPress={() => navigation.navigate('MemberDetails', { member })}
                    >
                        <View style={styles.member}>
                            <Image source={{ uri: member.photo }} style={styles.memberImage} />
                            {renderMemberStatus(member)}
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

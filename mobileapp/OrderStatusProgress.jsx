import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const statuses = ["new", "preparing", "served", "payment_pending", "completed"];
const { width } = Dimensions.get('window');
const barWidth = (width - 40 - (statuses.length * 20)) / (statuses.length - 1);

const statusColors = {
    "new": "#2196F3",
    "preparing": "#FFC107",
    "served": "#4CAF50",
    "payment_pending": "#FF9800",
    "completed": "#9E9E9E",
};

const statusTexts = {
    "new": "New",
    "preparing": "Preparing",
    "served": "Served",
    "payment_pending": "Payment Pending",
    "completed": "Completed",
};

const OrderStatusProgress = ({ currentStatus, orderId }) => {
    const currentStatusIndex = statuses.indexOf(currentStatus);

    const renderStatusItem = (status, index) => {
        const isCurrent = index === currentStatusIndex;
        const backgroundColor = isCurrent ? statusColors[status] : 'transparent';
        const color = isCurrent ? '#fff' : '#333';
        const fontWeight = isCurrent ? 'bold' : 'normal';

        return (
            <View key={status} style={[styles.statusContainer, { backgroundColor }]}>
                <Text style={[styles.statusText, { color, fontWeight }]}>{statusTexts[status]}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topRight}>
                <Text style={styles.billNumber}>Bill Number: {orderId}</Text>
            </View>
            <View style={styles.statusBar}>
                {statuses.map((status, index) => renderStatusItem(status, index))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        marginVertical: 10,
        width: '100%',
        position: 'relative', // Ensure positioning for the top-right corner
    },
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    statusContainer: {
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 3,
    },
    statusText: {
        fontSize: 16,
    },
    topRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
    },
    billNumber: {
        fontSize: 14,
        color: '#333',
    },
});

export default OrderStatusProgress;

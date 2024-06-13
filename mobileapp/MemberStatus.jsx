import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Example icon library, you can change as needed

const MemberStatus = ({ member }) => {
    let statusText = '';
    let icon = null;

    if (member.totalPrice === 0) {
        statusText = 'No Order';
        icon = <Icon name="shopping-basket" size={20} color="#555" />;
    } else if (!member.paymentDone) {
        statusText = 'Unpaid';
        icon = <Icon name="exclamation-circle" size={20} color="#ff6347" />;
    } else {
        statusText = 'Paid';
        icon = <Icon name="dollar" size={20} color="#32CD32" />;
    }

    if (member.paymentVerified) {
        statusText = 'Verified';
        icon = <Icon name="check-circle" size={20} color="#32CD32" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusContainer}>
                {icon}
                <Text style={styles.memberStatus}>{statusText}</Text>
            </View>

            <Text style={styles.memberTotalPrice}>Total Bill: ${member.totalPrice}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberStatus: {
        color: '#555',
        marginVertical: 2,
        marginLeft: 5,
    },
    memberTotalPrice: {
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
});

export default MemberStatus;

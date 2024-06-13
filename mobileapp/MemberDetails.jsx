import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const MemberDetails = ({ navigation, route }) => {
    const { member } = route.params;
    const orderedItems = member.itemList;

    const totalBill = orderedItems.reduce((total, item) => total + item.price, 0).toFixed(2);

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <View style={styles.profileContainer}>
                <Image source={{ uri: member.photo }} style={styles.profileImage} />
                <View style={styles.profileDetails}>
                    <Text style={styles.profileName}>{member.user}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderTitle}>Ordered Items</Text>
                    {orderedItems.map((item, index) => (
                        <View style={styles.itemContainer} key={index}>
                            <Image source={{ uri: item.image }} style={styles.foodIcon} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Footer navigation={navigation} activeIcon="solution1" />
            <View style={styles.totalBillContainer}>
                <Text style={styles.totalBill}>Total Bill: ${totalBill}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,
    },
    totalBillContainer: {
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 20,
        marginBottom: 70,
    },
    totalBill: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 35,
        marginRight: 10,
    },
    profileDetails: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderDetails: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    orderTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    foodIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#555',
    },
    itemPrice: {
        fontSize: 16,
        color: '#555',
    },
});

export default MemberDetails;
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const MemberDetails = ({ navigation, route }) => {
    const { member } = route.params;
    const orderedItems = member.orderedItems;

    const totalBill = member.bill.toFixed(2); // Rounded to 2 decimal places

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <View style={styles.profileContainer}>
                <Image source={member.image} style={styles.profileImage} />
                <View style={styles.profileDetails}>
                    <Text style={styles.profileName}>{member.name}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderTitle}>Ordered Items</Text>
                    {orderedItems.map((item) => (
                        <View style={styles.itemContainer} key={item.id}>
                            <Image source={item.image} style={styles.foodIcon} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text>${item.price}</Text>
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
});

export default MemberDetails;

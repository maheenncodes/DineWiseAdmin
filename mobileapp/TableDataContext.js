import React, { createContext, useState, useContext } from 'react';
import { fetchMembersData, getOrderStatus } from './api-table';
import { AuthContext } from './authcontext';

const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [members, setMembers] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [myShare, setMyShare] = useState(0);
    const [orderStatus, setOrderStatus] = useState(null);
    const { user } = useContext(AuthContext);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalVerified, setTotalVerified] = useState(0);
    const [isStatusLoaded, setIsStatusLoaded] = useState(false);

    const setTableDataLoaded = (value) => {
        setDataLoaded(value);
    };

    const setTableStatusLoaded = (value) => {
        setIsStatusLoaded(value);
    };
    const updateTableData = async (token, restaurantId, tableId) => {
        console.log('Updating table data');

        try {
            const { members, totalBill, totalPaid, totalVerified } = await fetchMembersData(token, restaurantId, tableId);
            setMembers(members);
            console.log('Members:', members);

            setTotalBill(totalBill);
            console.log('Total bill:', totalBill);
            setTotalPaid(totalPaid);
            console.log('Total paid:', totalPaid);
            setTotalVerified(totalVerified);
            console.log('Total verified:', totalVerified);


            const myDetails = members.find((member) => member.userId === user.userId);
            if (myDetails) {
                setMyShare(myDetails.totalPrice);
            }
            else {
                console.log('My share not found');
                setMyShare(0);
            }

            setDataLoaded(true);
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const loadOrderStatus = async (token, orderId) => {
        try {

            const status = await getOrderStatus(token, orderId);
            setOrderStatus(status);

            setIsStatusLoaded(true);
        } catch (error) {
            console.error('Error loading order status:', error);
        }
    };

    return (
        <TableDataContext.Provider
            value={{
                dataLoaded,
                members,
                totalBill,
                setTableDataLoaded,
                updateTableData,
                myShare,
                setTotalBill,
                setMyShare,
                loadOrderStatus,
                isStatusLoaded,
                orderStatus,
                totalPaid,
                setTotalPaid,
                totalVerified,
                setTableStatusLoaded,
            }}
        >
            {children}
        </TableDataContext.Provider>
    );
};

export default TableDataContext;
import React, { createContext, useState, useContext } from 'react';
import { fetchMembersData, getOrderStatus } from './api-table';
import { AuthContext } from './authcontext';

const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [members, setMembers] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [myShare, setMyShare] = useState(0);
    const [orderStatus, setOrderStatus] = useState(null); // New state for order status
    const { user } = useContext(AuthContext);
    const [totalPaid, setTotalPaid] = useState(0); // New state for total paid
    const [isStatusLoaded, setIsStatusLoaded] = useState(false);
    const setTableDataLoaded = (value) => {
        setDataLoaded(value);
    };

    const updateTableData = async (token, restaurantId, tableId) => {
        try {
            const { members, totalBill } = await fetchMembersData(token, restaurantId, tableId);
            setMembers(members);

            setTotalBill(totalBill);
            const myDetails = members.find((member) => member.userId === user.userId);
            if (myDetails) {
                console.log("my details", myDetails);
                setMyShare(myDetails.totalPrice);
            }
            setOrderStatus(null); // Reset order status when updating table data
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const loadOrderStatus = async (token, orderId) => {
        try {
            const status = await getOrderStatus(token, orderId);
            setOrderStatus(status);
            //   console.log('Order status:', status);
        } catch (error) {
            console.error('Error loading order status:', error);
        }
    };



    return (
        <TableDataContext.Provider
            value={{ dataLoaded, members, totalBill, setTableDataLoaded, updateTableData, myShare, setTotalBill, setMyShare, loadOrderStatus, isStatusLoaded, orderStatus, setIsStatusLoaded }}
        >
            {children}
        </TableDataContext.Provider>
    );
};

export default TableDataContext;

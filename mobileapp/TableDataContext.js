import React, { createContext, useState, useContext } from 'react';
import { fetchMembersData } from './api-table';
import { AuthContext } from './authcontext';

const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [members, setMembers] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [myShare, setMyShare] = useState(0);
    const { user } = useContext(AuthContext);
    const setTableDataLoaded = (value) => {
        setDataLoaded(value);


    };

    const updateTableData = async (token, restaurantId, tableId) => {
        try {
            //console.log('user:', user);
            const { members, totalBill } = await fetchMembersData(token, restaurantId, tableId);
            setMembers(members);
            setTotalBill(totalBill);
            const myDetails = members.find((member) => member.userId === user.userId);
            if (myDetails) {
                setMyShare(myDetails.totalPrice);
                console.log('My share:', myDetails.totalPrice);
            }


        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };
    return (
        <TableDataContext.Provider value={{ dataLoaded, members, totalBill, setTableDataLoaded, updateTableData, myShare, setTotalBill, setMyShare }}>
            {children}
        </TableDataContext.Provider>
    );
};

export default TableDataContext;

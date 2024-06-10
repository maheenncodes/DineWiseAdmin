import React, { createContext, useState, useContext } from 'react';
import { fetchMembersData } from './api-table';


const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [members, setMembers] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const setTableDataLoaded = (value) => {
        setDataLoaded(value);


    };

    const updateTableData = async (token, restaurantId, tableId) => {
        try {
            const { members, totalBill } = await fetchMembersData(token, restaurantId, tableId);
            setMembers(members);
            setTotalBill(totalBill);

            console.log("dataupaded");
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };
    return (
        <TableDataContext.Provider value={{ dataLoaded, members, totalBill, setTableDataLoaded, updateTableData }}>
            {children}
        </TableDataContext.Provider>
    );
};

export default TableDataContext;

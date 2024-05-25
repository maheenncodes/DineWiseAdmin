import React, { createContext, useState, useContext } from 'react';

const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
    const [dataLoaded, setDataLoaded] = useState(false);

    const setTableDataLoaded = (value) => {
        setDataLoaded(value);
    };

    return (
        <TableDataContext.Provider value={{ dataLoaded, setTableDataLoaded }}>
            {children}
        </TableDataContext.Provider>
    );
};

export default TableDataContext;

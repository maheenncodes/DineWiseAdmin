import React, { useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from './authcontext';
import { TableDataContext } from './TableDataContext'; // Correct import

const WebSocketManager = () => {
    const { user } = useContext(AuthContext);
    const { dataLoaded, setTableDataLoaded } = useContext(TableDataContext);

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.1.13:5000');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.operationType === 'insert' || message.operationType === 'update') {
                setTableDataLoaded(false);
            }
            if (message.userId === user._id) {
                // User themselves have scanned
                Alert.alert('Success', 'You have been successfully added to the table');
            } else {
                // Someone else has been added
                Alert.alert('Success', 'A new user has been added');
            }
        };

        return () => {
            ws.close();
        };
    }, [user, setTableDataLoaded]);

    return null; // Since this component doesn't render anything
};

export default WebSocketManager;

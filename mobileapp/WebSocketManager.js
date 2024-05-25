import { useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from './authcontext';

const WebSocketManager = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.1.9:5000');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
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
    }, [user]);

    return null; // Since this component doesn't render anything
};

export default WebSocketManager;

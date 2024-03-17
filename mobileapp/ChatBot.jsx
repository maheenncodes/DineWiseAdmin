import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Footer from './Footer';
import Header from './Header';

const ChatBot = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const flatListRef = useRef(null);

    // Sample initial message from chatbot
    useEffect(() => {
        setMessages([{ id: '1', text: 'Hi there! How can I help you?', type: 'bot', time: getTime() }]);
    }, []);

    const getTime = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;

        const newMessage = { id: String(messages.length + 1), text: inputText.trim(), type: 'user', time: getTime() };
        setMessages([...messages, newMessage]);
        setInputText('');

        // Automatically scroll to the latest message
        setTimeout(() => {
            flatListRef.current.scrollToEnd({ animated: true });
        }, 100);
    };

    const renderChatBubble = ({ item }) => {
        const isBot = item.type === 'bot';
        const alignStyle = isBot ? styles.botMessage : styles.userMessage;
        const source = isBot ? require('./assets/bot.png') : require('./assets/person0.png');

        return (
            <View style={[styles.messageContainer, alignStyle]}>
                {isBot ? (
                    <Image source={source} style={styles.image} />
                ) : null}
                <View style={[styles.messageBubble, isBot ? styles.botBubble : styles.userBubble]}>
                    <Text style={styles.messageText}>{item.text}</Text>
                    <Text style={styles.messageTime}>{item.time}</Text>
                </View>
                {!isBot ? (
                    <Image source={source} style={styles.image} />
                ) : null}
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <FlatList
                ref={flatListRef}
                style={styles.chatContainer}
                data={messages}
                renderItem={renderChatBubble}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContent}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                    onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Footer navigation={navigation} activeIcon="message1" style={styles.footer} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf7f5',
        flex: 1,
        borderRadius: 0, // Adjust the borderRadius as necessary
        overflow: 'hidden', // This will ensure the ImageBackground respects the borderRadius

        backgroundColor: '#fbf7f5',
        position: 'relative',
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    chatContent: {
        paddingBottom: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    botMessage: {
        justifyContent: 'flex-start',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    image: {
        width: 30,
        height: 30,
        marginHorizontal: 8,
        borderRadius: 15,
        backgroundColor: '#ccc',
        top: 8,
    },
    messageBubble: {
        maxWidth: '70%',
        borderRadius: 12,
        padding: 8,
        backgroundColor: '#f1f0f0',
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: '#777',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    flexFill: {
        flex: 1,
    },

});

export default ChatBot;

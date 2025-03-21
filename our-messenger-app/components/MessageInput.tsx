import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [text, setText] = useState("");

    const send = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText("");
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Type a message..." />
            <Button title="Send" onPress={send} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export default MessageInput;

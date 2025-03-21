import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ChatBubbleProps {
    text: string;
    sender: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender }) => (
    <View style={[styles.bubble, sender === "me" ? styles.userBubble : styles.otherBubble]}>
        <Text style={styles.text}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    bubble: {
        padding: 10,
        margin: 5,
        borderRadius: 8,
        maxWidth: "80%",
    },
    userBubble: {
        backgroundColor: "#0078ff",
        alignSelf: "flex-end",
    },
    otherBubble: {
        backgroundColor: "#e0e0e0",
        alignSelf: "flex-start",
    },
    text: {
        color: "#fff",
    },
});

export default ChatBubble;
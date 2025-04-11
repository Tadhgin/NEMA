import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatHeader = () => (
    <View style={styles.header}>
        <Text style={styles.title}>Messenger</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0078ff",
        padding: 15,
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ChatHeader;
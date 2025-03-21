import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface NotificationBadgeProps {
    count: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
    if (count === 0) return null;

    return (
        <View style={styles.badge}>
            <Text style={styles.text}>{count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "red",
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold"
    }
});

export default NotificationBadge;
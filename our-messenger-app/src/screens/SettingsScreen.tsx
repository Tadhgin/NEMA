import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.option}>
                <Text>Push Notifications</Text>
                <Switch />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    option: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }
});

export default SettingsScreen;
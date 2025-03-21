import React from "react";
import { View, FlatList } from "react-native";
import ChatBubble from "../components/ChatBubble";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import { useChat } from "../hooks/useChat";

const ChatScreen = () => {
    const { messages, send } = useChat();

    return (
        <View style={{ flex: 1 }}>
            <ChatHeader />
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatBubble text={item.text} sender={item.sender} />
                )}
            />
            <MessageInput
                onSendMessage={(text) => {
                    // Send the user's message as-is, no forced commands or prompts
                    send(text, "me");
                }}
            />
        </View>
    );
};

export default ChatScreen;
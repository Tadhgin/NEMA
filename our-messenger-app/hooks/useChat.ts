import { useState } from "react";
import { getMessages, sendMessage } from "../backend/messageService";

export const useChat = () => {
    const [messages, setMessages] = useState(getMessages());

    const send = (text: string, sender: string) => {
        const newMessage = sendMessage(text, sender);
        setMessages([...messages, newMessage]);
    };

    return { messages, send };
};

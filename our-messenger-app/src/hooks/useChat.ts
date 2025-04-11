import { useState } from "react";

type Message = {
  id: string;
  text: string;
  sender: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const send = (text: string, sender: string) => {
    // Add the sender's message to the chat
    const newMessage = { id: Date.now().toString(), text, sender };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return { messages, send };
};
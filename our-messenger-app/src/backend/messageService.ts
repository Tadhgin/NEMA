interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: number;
}

let messages: Message[] = [];

export const getMessages = (): Message[] => messages;

export const sendMessage = (text: string, sender: string): Message => {
    const newMessage = { id: Date.now().toString(), text, sender, timestamp: Date.now() };
    messages.push(newMessage);
    return newMessage;
};
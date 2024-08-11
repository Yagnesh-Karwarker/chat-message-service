import React from 'react';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import { Message } from '@/types';
interface ChatWindowProps {
  messages: Message[];
  sendMessage: (content: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, sendMessage }) => {
  return (
    <div className="chat-window">
      <MessageList messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
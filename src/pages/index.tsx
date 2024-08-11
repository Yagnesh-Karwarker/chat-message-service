import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import ChatWindow from '@/components/ChatWindow';
import { Message } from '@/types';

let socket: any;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const socketInitializer = async () => {
    await fetch('/api/socketio');
    socket = io(undefined, {
      path: '/api/socketio',
    });

    socket.on('new-message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  };

  useEffect(() => {
    socketInitializer();
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch('/api/messages');
    const data = await response.json();
    setMessages(data);
  };

  const sendMessage = useCallback(async (content: string) => {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const newMessage = await response.json();
    // No need to update state here, as it will be updated by the socket event
  }, []);

  return (
    <div className="container">
      <h1>Simple Chat App</h1>
      <ChatWindow messages={messages} sendMessage={sendMessage} />
    </div>
  );
}
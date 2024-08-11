import React, { useState } from 'react';

interface MessageInputProps {
  sendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      sendMessage(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
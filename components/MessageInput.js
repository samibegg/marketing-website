// components/MessageInput.js
import React, { useState } from 'react';

export default function MessageInput({ onSendMessage, disabled }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!inputValue.trim() || disabled) return;
    onSendMessage(inputValue);
    setInputValue(''); // Clear input after sending
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-gray-300 flex bg-white">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}
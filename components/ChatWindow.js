// components/ChatWindow.js
import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

// Define the new initial messages structure (as per previous step)
const initialMessages = [
  {
    id: 'bot-greeting-initial-1',
    text: 'Interested in seeing our platform live?',
    sender: 'bot',
    type: 'text',
  },
  {
    id: 'bot-action-book-demo',
    type: 'buttonLink',
    text: 'Book a Demo',
    href: '/demo',
    sender: 'bot',
  },
  {
    id: 'bot-prompt-alternative',
    text: 'Or, send us a message.',
    sender: 'bot',
    type: 'text',
  },
];

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (inputText) => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      type: 'text',
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText, history: messages }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
        type: 'text',
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Failed to get chat response:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        type: 'text',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Your existing container styling is kept
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
      {/* Updated Header Area with Title and Close Button */}
      <div className="p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 shrink-0"> {/* Added shrink-0 to prevent header from shrinking */}
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          How can we help? {/* Your Header Text */}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
// components/MessageList.js
import React, { useRef, useEffect } from 'react';
import Link from 'next/link'; // Import Link from Next.js

export default function MessageList({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]); // Ensure scroll on loading change too

  return (
    <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-3"> {/* Added space-y-3 for message spacing */}
      {messages.map((msg) => {
        // Handle buttonLink type for bot messages
        if (msg.type === 'buttonLink' && msg.sender === 'bot') {
          return (
            <div key={msg.id} className="flex justify-start"> {/* Bot messages align left */}
              <Link href={msg.href} legacyBehavior>
                <a
                  className="inline-block bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800 transition-colors duration-150"
                  // If your /demo page should open in a new tab, add target="_blank"
                  // target="_blank" rel="noopener noreferrer"
                >
                  {msg.text}
                </a>
              </Link>
            </div>
          );
        }

        // Default text message rendering (covers type: 'text' or undefined type)
        return (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-lg px-3 py-2 max-w-[80%] break-words shadow-sm ${ // Softer shadow for messages
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}

      {/* Optional: Loading indicator for bot response */}
      {isLoading && (
         <div className="flex justify-start">
            <div className="rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 italic shadow-sm">
                Typing...
            </div>
         </div>
      )}
      {/* Empty div to help scroll to bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
}
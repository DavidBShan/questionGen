import React, { useState } from 'react';
import fs from 'fs';

async function callApi(courseContent:any, question:any) {
    try {
      const response = await fetch("/api/answerQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseContent: courseContent,
          question: question,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle the API response data as needed
        console.log("API Response:", data);
        return data;
      } else {
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error calling the API:", error);
    }
  }

const ChatWidget = () => {
    const [messages, setMessages] = useState([
        { role: "system", id: 1, content: 'Hi there, how can I help you?'}
      ]);
      let pdfText = '';
      try {
        const jsonData = fs.readFileSync("../../uploads/output.json", 'utf8');
        pdfText= JSON.parse(jsonData).text;
    } catch (error) {
        throw error;
    }
    
      const [newMessage, setNewMessage] = useState('');
    
      const handleInputChange = (e:any) => {
        setNewMessage(e.target.value);
      };
    
      const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
    
        const newMessageObj = {
          role: "user",
          content: newMessage,
          id: messages.length + 1,
        };
        
        setMessages([...messages, newMessageObj]);
        const answer = await callApi(pdfText, newMessage);
        const tutorMessageObj = {
            role: "tutor",
            content: answer,
            id: messages.length + 1,
          };
          setMessages([...messages, tutorMessageObj]);
        setNewMessage('');
      };

  return (
    <div className="bg-gray-200 rounded p-4 h-full">
      <div className="text-xl font-bold mb-4 text-center">Chat</div>
      <div className="h-3/4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`text-sm font-semibold ${message.role === "user" ? "text-blue-600" : "text-green-600"}`}>
              {message.role === "user" ? "You" : "Tutor"}
            </div>
            <div className="bg-white rounded p-2">{message.content}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          className="mt-7 w-full rounded p-2 border"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;

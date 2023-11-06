import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/store';
import { useSession } from 'next-auth/react';
import { getSentMessagesTutor } from '@/util/users';
import { useRouter } from 'next/navigation';

async function callApi(question: any, pdfText: any, userId: any) {
  try {
    console.log(pdfText);
    const response = await fetch("/api/answerQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        text: pdfText,
        uid: userId
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.message;
    } else {
      console.error("API request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error calling the API:", error);
  }
}

const ChatWidget = () => {

  const router = useRouter();

  const [newMessage, setNewMessage] = useState('');
  const { data, setData, messages, setMessages , pdfText, setPdfText} = useGlobalContext();
  
  const { data: session } = useSession();

  const [userId, setUserId] = useState<any>(session?.user);
  const [sentMessagesTutor, SetSentMessagesTutor] = useState(0);

  
  let iterations = 0;

  useEffect(() => {
    while (session?.user === undefined && iterations < 10) {
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      iterations++;
    }
  
    if (session?.user !== undefined) {
      setUserId(session?.user);
  
      console.log(session?.user);
  
      getSentMessagesTutor(session?.user, SetSentMessagesTutor);
    }
  }, [userId, session, iterations]);
  
  // Add another useEffect to log changes in sentMessagesTutor
  useEffect(() => {
    console.log("sentMessagesTutor changed:", sentMessagesTutor);
  }, [sentMessagesTutor]);
  
  const handleInputChange = (e: any) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      role: "user",
      content: newMessage,
      id: messages.length + 1,
    };

    const thinkingMessageObj = {
      role: "tutor",
      content: "AI Tutor is thinking...",
      id: messages.length + 2,
    };

    setMessages([...messages, newMessageObj, thinkingMessageObj]);
    setNewMessage('');

    const answer = await callApi(newMessage, pdfText, userId);

    const tutorMessageObj = {
      role: "tutor",
      content: answer,
      id: messages.length + 3, // Ensure a unique ID
    };

    setMessages([...messages, newMessageObj, tutorMessageObj]);
    setNewMessage('');
    getSentMessagesTutor(session?.user, SetSentMessagesTutor);
  };

  return (

    <div className="flex h-full flex-col rounded-lg bg-blue-100 p-4">
      {(sentMessagesTutor < 21) && <div>
        <div className="mb-4 text-center text-xl font-bold md:text-2xl">Chat</div>
      
      <div className="no-scrollbar grow overflow-y-auto text-base md:text-lg">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`text-sm font-semibold md:text-base ${message.role === "user" ? "text-blue-600" : "text-gray-600"}`}>
              {message.role === "user" ? "You" : "Tutor"}
            </div>
            <div className="rounded-xl bg-white p-2">{message.content}</div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-end justify-center pb-2 text-center  md:pb-0">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          className="w-3/4 rounded-xl border p-2 md:w-4/5"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 mt-2 w-1/4 rounded bg-blue-500 py-2 text-center font-bold text-white hover:bg-blue-700 md:ml-0 md:mt-0 md:w-1/5"
        >
          Send
        </button>
      </div>
      </div>
     }

{(sentMessagesTutor >= 21) && <div>
  <div className='flex flex-col items-center text-center'>
          <div className="mb-2 text-md font-bold md:text-lg font-medium">You&apos;re out of free messages</div>

          <div className='mb-4 text-xl font-bold md:text-2xl'>
            <span className='text-black'>Unlock </span>
            <span className='text-aceflow-blue'>Aceflow Pro+ </span>
          </div>

          <button
            onClick={() => {router.push(`/pro`)}}
            className="w-[70%] rounded-xl bg-aceflow-blue px-1 
            py-3
            text-lg
            font-bold text-white md:w-[85%] hover:bg-blue-600 md:py-4 md:text-2xl"
        >
            Go Unlimited
        </button>
      </div>
      </div>
     }
     
    </div>

  );
};

export default ChatWidget;

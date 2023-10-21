import { createContext, useContext, useState } from 'react';

const messageContext = createContext();

export function MyProvider({ children }) {
  const [messages, setMessages] = useState([
    { role: "system", id: 1, content: 'Hi there, how can I help you?'}
  ]);

  return (
    <messageContext.Provider value={{ messages, setMessages }}>
      {children}
    </messageContext.Provider>
  );
}

export function useMessageContext() {
  return useContext(messageContext);
}

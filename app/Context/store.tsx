'use client'
import { createContext, useContext, useState, SetStateAction, Dispatch } from 'react';

type DataType = {
  question: string;
  options: string[];
  correctAnswer: string;
};

interface ContextProps {
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
  messages: { role: string; id: number; content: string }[];
  setMessages: Dispatch<SetStateAction<{ role: string; id: number; content: string }[]>>;
  pdfText: string;
  setPdfText: Dispatch<SetStateAction<string>>; 
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>; 
}

const GlobalContext = createContext<ContextProps>({
  data: [],
  setData: (): DataType[] => [],
  messages: [{ role: 'system', id: 1, content: 'Hi there, how can I help you?' }],
  setMessages: (): { role: 'system'; id: 1; content: 'Hi there, how can I help you?' }[] => [],
  pdfText: 'use client',
  setPdfText: (): string => '', 
  userEmail: '',
  setUserEmail: (): string => ''
});

export const GlobalContextProvider = ({ children }: any) => {
  const [data, setData] = useState<[] | DataType[]>([]);
  const [messages, setMessages] = useState([
    { role: 'system', id: 1, content: 'Hi there, how can I help you?' },
  ]);
  const [pdfText, setPdfText] = useState('use client');
  const [userEmail, setUserEmail] = useState('');

  return (
    <GlobalContext.Provider value={{ data, setData, messages, setMessages, pdfText, setPdfText, userEmail, setUserEmail }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

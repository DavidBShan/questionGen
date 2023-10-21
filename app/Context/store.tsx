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
  setPdfText: Dispatch<SetStateAction<string>>; // Add setPdfText to update pdfText
}

const GlobalContext = createContext<ContextProps>({
  data: [],
  setData: (): DataType[] => [],
  messages: [{ role: 'system', id: 1, content: 'Hi there, how can I help you?' }],
  setMessages: (): { role: 'system'; id: 1; content: 'Hi there, how can I help you?' }[] => [],
  pdfText: 'use client',
  setPdfText: (): string => '', // Provide a default implementation
});

export const GlobalContextProvider = ({ children }: any) => {
  const [data, setData] = useState<[] | DataType[]>([]);
  const [messages, setMessages] = useState([
    { role: 'system', id: 1, content: 'Hi there, how can I help you?' },
  ]);
  const [pdfText, setPdfText] = useState('use client');

  return (
    <GlobalContext.Provider value={{ data, setData, messages, setMessages, pdfText, setPdfText }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

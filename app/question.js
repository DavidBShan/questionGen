import { createContext, useContext, useState } from 'react';

const questionContext = createContext();

export function MyProvider({ children }) {
  const [questions, setQuestions] = useState([]);

  return (
    <questionContext.Provider value={{ questions, setQuestions }}>
      {children}
    </questionContext.Provider>
  );
}

export function useMyContext() {
  return useContext(questionContext);
}

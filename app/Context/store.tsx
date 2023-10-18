'use client'
import {createContext, useContext, useState, SetStateAction, Dispatch} from 'react';
type DataType = {
    question: string,
    options: string[],
    correctAnswer: string
}

interface ContextProps {
    data: DataType[],
    setData: Dispatch<SetStateAction<DataType[]>>
}

const GlobalContext = createContext<ContextProps>({
    data: [],
    setData: (): DataType[] => []
});

export const GlobalContextProvider = ({ children }:any) => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState<[] | DataType[]>([]);
    
    return (
        <GlobalContext.Provider value={{ data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);

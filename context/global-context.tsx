// GlobalContext.tsx
"use client";
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from 'react';

type ProjectDataType = {
  name: string;
  language: string;
  description: string;
};

type UserData = {
  userId: string;
  score: number;
};

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

type GlobalContextType = {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  projectData: ProjectDataType[];
  addProjectData: (project: ProjectDataType) => void;
  userData: UserData[];
  addUserData: (userData: UserData) => void;
  setUserData: Dispatch<SetStateAction<UserData[]>>;
  quizData: QuizQuestion[];
  addQuizData: (data: QuizQuestion[]) => void;
};

const GlobalContext = createContext<GlobalContextType>({
  userId: '',
  setUserId: () => {},
  projectData: [],
  addProjectData: () => {},
  userData: [],
  addUserData: () => {},
  setUserData: () => {},
  quizData: [],
  addQuizData: () => {},
 
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC = ({ children }) => {

  const [userId, setUserId] = useState('');
  const [projectData, setProjectData] = useState<ProjectDataType[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedQuizData = localStorage.getItem('quizData');
    console.log('This is the storedUserData:', storedUserData);
    console.log('This is the storedQuizData:', storedQuizData);
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      
    }
    if (storedQuizData) {
      setQuizData(JSON.parse(storedQuizData));
    }
  }, []);

  const addProjectData = (project: ProjectDataType) => {
    setProjectData(prevData => [...prevData, project]);
  };

  const addUserData = (userDataItem: UserData) => {
    setUserData(prevData => [...prevData, userDataItem]);
    localStorage.setItem('userData', JSON.stringify([...userData, userDataItem]));
  };

  const addQuizData = (data: QuizQuestion[])=>{
    setQuizData(data);
    localStorage.setItem('quizData', JSON.stringify(data));

  }

  return (
    <GlobalContext.Provider value={{ userId, setUserId, projectData, addProjectData, userData, addUserData, setUserData, quizData, addQuizData }}>
      {children}
    </GlobalContext.Provider>
  );
};

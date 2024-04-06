"use client";
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/global-context';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

import { ConfettiButton } from './components/ConfettiButton';




// Define the type for the quiz question
interface Question {
  id: number;
  question: string;
  answer: string;
  options: string[]; // Added options field
}

// Define the type for options
interface Option {
  id: number;
  value: string;
  questionId: number;
}

const Quiz = () => {
  const [isExploding, setIsExploding] = React.useState(false);
  const router = useRouter();
  const [questionData, setQuestionData] = useState<Question[] | null>(null);
  const [participantID, setParticipantID] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number>(0);
  const [answerCorrectness, setAnswerCorrectness] = useState<{ [key: number]: boolean }>({});
  const [questionTracker, setQuestionTracker] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsResponse, optionsResponse] = await Promise.all([
          axios.get('/api/questions'),
          axios.get('/api/options'),
        ]);
        const questions: Question[] = questionsResponse.data;
        const options: Option[] = optionsResponse.data;

        const combinedData = questions.map(question => {
          const { id, question: questionText, answer } = question;
          const questionOptions = options.filter(option => option.questionId === id).map(option => option.value);
          return {
            id,
            question: questionText,
            answer,
            options: questionOptions,
          };
        });

        setQuestionData(combinedData);
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Handle fetch error if needed
      }
    };

    fetchData();
    setParticipantID(generateUniqueID());
  }, []);

  const generateUniqueID = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleAnswerSelection = (questionID: number, selectedOption: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionID]: selectedOption });
  };

  const handleAnswer = async (id: number, selectedAnswer: string) => {
    const question = questionData?.find(q => q.id === id);
  
    const correct = question?.answer === selectedAnswer;
    if (correct) {
      setScore(prev => prev + 1); // Update the score
      setIsExploding(true); // Trigger confetti explosion
    }
  
    setAnswerCorrectness({ ...answerCorrectness, [id]: correct });


    //  see here mr sajan
    if (questionTracker === (questionData?.length ?? 0)-1) {
      console.log("questiondata ", questionData?.length);
      // Use the updated score value in the POST request
      await axios.post('/api/score', { userId: participantID, score });
      router.push(`/results`);
    } else {
      setTimeout(() => {
        setQuestionTracker(prev => prev + 1);
        setIsExploding(false); // Reset confetti explosion state
      }, 2000);
    }
  };
  
  

  const renderQuestion = (num: number) => {
    const question = questionData ? questionData[num] : null;

    const backgroundColors = ['bg-custom1', 'bg-custom2', 'bg-custom3', 'bg-custom4'];

    return (
      <div key={question?.id} className="flex flex-col gap-12 px-4">
        <div className="p-6 shadow-md rounded-md text-center" style={{ backgroundColor: '#ffeeee' }}>
          <p className="mb-2 text-2xl md:text-4xl">{question?.question}?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question?.options.map((option, idx) => (
            <div key={option} className="bg-white shadow-md rounded-md md:w-264 md:h-44">
              <button
                className={`text-lg md:text-2xl w-full h-full border rounded-md px-4 py-2 ${
                  selectedAnswers[question?.id] === option
                    ? answerCorrectness[question?.id] ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    : `${backgroundColors[idx]}`
                }`}
                onClick={() => {
                  handleAnswerSelection(question?.id, option);
                  handleAnswer(question?.id, option);
                }}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    

    <div className="bg-cover bg-center h-full" style={{ backgroundImage: 'url(/bgimage.jpg)' }}>
        {/* Participant ID */}
        <div className="flex flex-col sm:flex-col lg:flex-row md:flex-col md:justify-between mx-2">
            <div className="p-4 mb-4 w-auto inline-block text text-lg md:text-2xl text-center" style={{ backgroundColor: '#ffeef8' }}>
                <p>Your ID: {participantID}</p>
            </div>
            <div className="bg-gray-200 p-4 mb-4 w-auto inline-block text text-lg md:text-2xl text-center" style={{ backgroundColor: '#fbeeff' }}>
                {score > 0 && <p>Your score: {score}</p>}
            </div>
        </div>

        {questionData && renderQuestion(questionTracker)}
        {isExploding && <ConfettiButton isExploding={true} />}


        
    </div>
  );
};

export default Quiz;

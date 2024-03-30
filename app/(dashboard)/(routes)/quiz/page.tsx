"use client";
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/global-context';
import { useParams, useRouter, usePathname } from "next/navigation";
import getQuestions from '@/actions/get-questions';
import { set } from 'react-hook-form';






// Define the type for the quiz question
type Question = {
    id: number;
    question: string;
    options: string[];
    answer: string;
};



const Quiz = async() => {
    let questions: Question[];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionData = await getQuestions();
                setQuestionData(questionData);
                console.log("This is the questionData inside useEffect", questionData);
                // Set the state or perform other actions with the fetched data here
            } catch (error) {
                console.error("Error fetching questions:", error);
                // Handle fetch error if needed
            }
        };
    
        fetchData();
        setParticipantID(generateUniqueID());
    }, []);
    


    // Define quiz questions and answers
    const [questionTracker, setQuestionTracker] = useState<number>(0);

    const router = useRouter();
    const pathname = usePathname()
    const [questionData, setQuestionData] = useState<Question[] | null>(null);
    
    
    
    const hardQuestions: Question[] = [
        {
            "id": 1,
            "question": "What is the key difference between git fork and git clone as explained by Cameron McKenzie",
            "options": [
                "Amount of control over repository",
                "Number of repositories",
                "Type of files",
                "GitHub URLs"
            ],
            "answer": "Amount of control over repository"
        },
        {
            "id": 2,
            "question": "According to Cameron McKenzie, what can a developer do with the cloned repository",
            "options": [
                "Make changes",
                "Delete repository",
                "Rename repository",
                "Share repository"
            ],
            "answer": "Make changes"
        },
        {
            "id": 3,
            "question": "In the scenario described by Cameron McKenzie, what is the example repository owned by him called",
            "options": [
                "Cameron McNz",
                "J Guevara",
                "Rock Paper Scissors",
                "Java Revolutionary"
            ],
            "answer": "Cameron McNz"
        },
        {
            "id": 4,
            "question": "How does a developer obtain the GitHub URL necessary for cloning a repository",
            "options": [
                "Request from administrator",
                "Generate during clone",
                "Find in repository settings",
                "Locate in the README file"
            ],
            "answer": "Locate in the README file"
        },
        {
            "id": 5,
            "question": "After performing git add and git commit on the cloned repository, what is the next step described by Cameron McKenzie",
            "options": [
                "Git pull",
                "Git push",
                "Git merge",
                "Git branch"
            ],
            "answer": "Git push"
        }
    ]
    // Generate a unique ID for each participant
    const generateUniqueID = (): string => {
        return Math.random().toString(36).substr(2, 9);
    };

    // State to store participant's ID, selected answers, and score
    const { addUserData, quizData } = useGlobalContext();
    

    const [participantID, setParticipantID] = useState<string>('');
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [score, setScore] = useState<number>(0);
    const [answerCorrectness, setAnswerCorrectness] = useState<{ [key: number]: boolean }>({});

    
    


    
     





    


   console.log("helllllll", questionData)

    if (questionData) {
        console.log("This is the questionData inside if", questionData)
        questions = questionData;
    }

    // Effect to generate participant ID on component mount
    


   

    // Function to handle answer selection
    const handleAnswerSelection = (questionID: number, selectedOption: string) => {
        setSelectedAnswers({ ...selectedAnswers, [questionID]: selectedOption });
    };


    const handleAnswer = (id: number, selectedAnswer: string) => {
       
        const question = questions.find(q => q.id === id);
    
        const correct = question?.answer === selectedAnswer;
        if (correct) {
            setScore(prev => prev + 1);
        }

        setAnswerCorrectness({ ...answerCorrectness, [id]: correct });

        setAnswerCorrectness({ ...answerCorrectness, [id]: correct });

        if (questionTracker === questions.length - 1) {
            setTimeout(() => {
                addUserData({ userId: participantID, score });
                router.push(`/results`);
            }, 500);
            return;
        }else{
            setTimeout(() => {
                setQuestionTracker(prev => prev + 1);
            }, 500);

        }

        
    };


    const renderQuestion = (num: number) => {
        const question = questionData ? questionData[num] : null;

        const backgroundColors = ['bg-custom1', 'bg-custom2', 'bg-custom3', 'bg-custom4'];
    
        return (
            <div key={question?.id} className='flex flex-col gap-12 px-4'>
                <div className='p-6  shadow-md rounded-md text-center ' style={{ backgroundColor: '#ffeeee' }}>
                    <p className="mb-2 text-2xl md:text-4xl">{question?.question}?</p>
                </div>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question?.options.map((option,idx) => (
                        <div key={option} className="bg-white shadow-md rounded-md md:w-264 md:h-44">
                            <button
                               
                                className={`text-lg md:text-2xl w-full h-full border rounded-md px-4 py-2 ${
                                    selectedAnswers[question?.id] === option
                                        ? answerCorrectness[question?.id] ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                        : `${backgroundColors[idx]}`
                                }`}
                                onClick={() => {
                                    handleAnswerSelection(question?.id, option)
                                    handleAnswer(question?.id, option)
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
            <div className='flex flex-col sm:flex-col lg:flex-row md:flex-col md:justify-between mx-2'>
            <div className='  p-4 mb-4 w-auto inline-block text text-lg md:text-2xl text-center' style={{ backgroundColor: '#ffeef8' }}>
            <p  >Your ID: {participantID}</p>
            </div>
            <div className='bg-gray-200 p-4 mb-4 w-auto inline-block  text text-lg md:text-2xl text-center'style={{ backgroundColor: '#fbeeff' }}>
            {score > 0 && <p>Your score: {score}</p>}
            </div>

            </div>
        
            {renderQuestion(questionTracker)}
    
           
        </div>


    );
};

export default Quiz;

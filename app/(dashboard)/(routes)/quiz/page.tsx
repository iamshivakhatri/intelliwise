"use client";
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/global-context';
import { useParams, useRouter, usePathname } from "next/navigation";
import { Heading } from '@/components/ui/heading';
import Container from '@/components/ui/container';



// Define the type for the quiz question
type Question = {
    id: number;
    question: string;
    options: string[];
    answer: string;
};

const Quiz = () => {
    // Define quiz questions and answers
    const [questionTracker, setQuestionTracker] = useState<number>(0);

    const router = useRouter();
    const pathname = usePathname()
    
    const questions: Question[] = [
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
    const { addUserData } = useGlobalContext();
    const [participantID, setParticipantID] = useState<string>('');
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [score, setScore] = useState<number>(0);
    const [answerCorrectness, setAnswerCorrectness] = useState<{ [key: number]: boolean }>({});


    // Effect to generate participant ID on component mount
    useEffect(() => {
        setParticipantID(generateUniqueID());
    }, []);

    // Function to handle answer selection
    const handleAnswerSelection = (questionID: number, selectedOption: string) => {
        setSelectedAnswers({ ...selectedAnswers, [questionID]: selectedOption });
    };

    // Function to calculate the score
    // const calculateScore = () => {
    //     let newScore = 0;
    //     questions.forEach(question => {
    //         if (selectedAnswers[question.id] === question.answer) {
    //             newScore++;
    //         }
    //     });
    //     setScore(newScore);
    //     addUserData({ userId: participantID, score: newScore });
    //     router.push(`/results`)
    //     router.refresh();
    // };

    const handleAnswer = (id: number, selectedAnswer: string) => {
        // let newScore = score;
        // let tracker = questionTracker;
        const question = questions.find(q => q.id === id);
    
        // if (question && question.answer == selectedAnswer) {
        //     newScore++;
        //     console.log("This is newScore", newScore)
        //     //change the color of the button to green
        // }else{
        //     //change the color of the button to red
        //     //show the correct answer
        // }


        // setScore(newScore);

        // tracker++;
        // setQuestionTracker(tracker);  
        const correct = question?.answer === selectedAnswer;
        if (correct) {
            setScore(prev => prev + 1);
        }

        setAnswerCorrectness({ ...answerCorrectness, [id]: correct });

        // Update question tracker
        // setQuestionTracker(prev => prev + 1);
        setAnswerCorrectness({ ...answerCorrectness, [id]: correct });

        if (questionTracker === questions.length - 1) {
            setTimeout(() => {
                addUserData({ userId: participantID, score });
                router.push(`/results`);
            }, 3000);
            return;
        }else{
            setTimeout(() => {
            
                // Update question tracker after delay
                setQuestionTracker(prev => prev + 1);
            }, 3000);

        }

        
    };


    useEffect(() => {
        // Redirect to the same page to trigger a refresh
        router.replace(pathname);
    }, [questionTracker]);

    // Render quiz questions and options
    // const renderQuestion = (num: number ) => {
    //     const question = questions[num];
    //     console.log("This is question", question);
    //     return (
    //         <div key={question.id} className="mb-6 p-4 bg-white shadow-md rounded-md">

    //             <p className="mb-2">{question.question}</p>
    //             <div className="grid grid-cols-1 gap-4 max-w-sm">
    //                 {question.options.map(option => (
    //                     <button
    //                         key={option}
    //                         className={`border rounded-md px-4 py-2 ${
    //                             selectedAnswers[question.id] === option
    //                                 ? answerCorrectness[question.id] ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    //                                 : 'bg-gray-200'
    //                         }`}
    //                         onClick={
    //                             () => {
    //                             handleAnswerSelection(question.id, option)
    //                             handleAnswer(question.id, option)
    //                         }
    //                     }
    //                     >
    //                         {option}
    //                     </button>
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // };
    // const renderQuestion = (num: number ) => {
    //     const question = questions[num];
     
    //     return (
    //         <div key={question.id} className='flex flex-col gap-9'>
    //             <div className='flex items-center justify-center p-7  px-9 mb-6  border bg-gray-200  shadow-md '>
    //             <p className="mb-2 text-4xl">{question.question}?</p>
   
    //             </div>
               
    //             <div className="grid grid-cols-2 gap-4">
    //                 {question.options.map(option => (
    //                     <div key={option} className="w-264 h-44 bg-white shadow-md rounded-md ">
    //                         <button
    //                             className={`text-3xl w-full h-full border rounded-md px-4 py-2 ${
    //                                 selectedAnswers[question.id] === option
    //                                     ? answerCorrectness[question.id] ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    //                                     : 'bg-gray-200'
    //                             }`}
    //                             onClick={() => {
    //                                 handleAnswerSelection(question.id, option)
    //                                 handleAnswer(question.id, option)
    //                             }}
    //                         >
    //                             {option}
    //                         </button>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // };
    const renderQuestion = (num: number) => {
        const question = questions[num];
    
        return (
            <div key={question.id} className='flex flex-col gap-12 px-4'>
                <div className='p-6 bg-gray-200 shadow-md rounded-md text-center'>
                    <p className="mb-2 text-2xl md:text-4xl">{question.question}?</p>
                </div>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map(option => (
                        <div key={option} className="bg-white shadow-md rounded-md md:w-264 md:h-44">
                            <button
                                className={`text-lg md:text-2xl w-full h-full border rounded-md px-4 py-2 ${
                                    selectedAnswers[question.id] === option
                                        ? answerCorrectness[question.id] ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                        : 'bg-gray-200'
                                }`}
                                onClick={() => {
                                    handleAnswerSelection(question.id, option)
                                    handleAnswer(question.id, option)
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
   
            <div>

           
      
            
            {/* Participant ID */}
            <div className='flex justify-between'>
            <div className=' bg-gray-200 p-4 mb-4 w-auto inline-block text text-lg md:text-2xl text-center'>
            <p  >Your ID: {participantID}</p>
            </div>
            <div className='bg-gray-200 p-4 mb-4 w-auto inline-block  text text-lg md:text-2xl text-center'>
            {score > 0 && <p className="mt-4">Your score: {score}</p>}
            </div>

            </div>
           
     
            
            {/* Quiz Questions */}
            {renderQuestion(questionTracker)}
            {/* Submit button */}
            {/* <button
                className="bg-green-500 text-white rounded-md px-4 py-2 mt-4"
                onClick={calculateScore}
            >
                Submit Answers
            </button> */}
            {/* Score */}
           
            </div>


    );
};

export default Quiz;

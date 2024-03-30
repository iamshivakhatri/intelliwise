"use client";
import getProducts from '@/actions/get-products';
import { get } from 'http';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/global-context';
import sendQuestions from '@/actions/send-questions';

const Home: React.FC = () => {
  type QuizQuestion = {
    id: number;
    question: string;
    options: string[];
    answer: string;
  };


  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const {addQuizData} = useGlobalContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = async(event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setMessage('You pressed Enter with input: ' + inputValue);
      const data = await getProducts(inputValue);

      if (data !== null) {
        sendQuestions(data)
        addQuizData(data)
   
      }
    
      console.log("This is data from the API", JSON.stringify(data, null, 2));
      router.push('/qrcode');
    }
    

  };

  return (
    <div className='flex flex-col items-center h-screen'>
      <div className='w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2 mt-20 space-y-4 p-8 pt-6'>
        <input
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          type="text"
          placeholder="Enter something and press Enter"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {message && (
          <p className="text-gray-500 text-sm">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Home;

"use client";
import getProducts from "@/actions/get-products";
import { get } from "http";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/global-context";
import sendQuestions from "@/actions/send-questions";
import axios from "axios";
import Spline from "@splinetool/react-spline";
import { Heading } from "@/components/ui/heading";

const Home: React.FC = () => {
  type QuizQuestion = {
    id: number;
    question: string;
    options: string[];
    answer: string;
  };

  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { addQuizData } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to track loading animation

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setIsLoading(true); // Start loading animation

      setMessage("You pressed Enter with input: " + inputValue);
      const data = await getProducts(inputValue);

      if (data !== null) {
        // sendQuestions(data)

        await axios.delete(`/api/score`);
        await axios.post(`/api/questions`, data);
      }

      console.log("This is data from the API", JSON.stringify(data, null, 2));
      router.push("/qrcode");
    }
  };

  return (
    <div className="" style={{ 
      backgroundImage: 'url("bg.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="ml-5 pt-5">

      <Heading title="Intelliwise" description="Level up yourself" />
      </div>
      
      
      <div className="flex flex-col items-center justify-center h-screen">

     

      <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 mb-50 space-y-4 p-8 pt-6">
        <input
          className="w-full h-14 bg-gray-100    rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          type="text"
          placeholder="Enter something and press Enter"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        {message && <p className="text-gray-500 text-sm">{message}</p>}
        {isLoading && (
          <div className="flex ml-9" style={{ 
            marginLeft: '150px',
            }}>

              {/* Render the Spline animation instead of text */}
              <Spline
                scene="https://prod.spline.design/aVSFqX42W3qbp8jx/scene.splinecode"
                className=" w-3 h-3 ml-9"
              />

          </div>

        )}
      </div>
      </div>
    </div>
  );
};

export default Home;

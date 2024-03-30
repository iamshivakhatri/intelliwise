

import {Question} from '@/types'


const getQuestions = async (): Promise<Question[]> => {
    const res = await fetch('http://10.24.109.135:5000/get_data');
    const data = await res.json();
    console.log("This is the data from the API in getQuestions", data)
    return data;
};

export default getQuestions


// import { Question } from '@/types';

// const getQuestions = async () => {
//   try {
//     const res = await fetch('http://127.0.0.1:5000/get_data', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//         // Add any other headers as needed
//       },
//     });

//     // Check if the response was successful
//     if (!res.ok) {
//       throw new Error('Failed to fetch questions');
//     }

//     // Assuming the server sends back JSON data
//     const questions = await res.json();

//     // Process the questions data as needed
//     console.log('Questions:', questions);

//     // You may want to map the JSON data to your Question type
//     const mappedQuestions: Question[] = questions.map((question: any) => ({
//       id: question.id,
//       question: question.question,
//       options: question.options,
//       answer: question.answer,
//     }));
//     console.log("This is the mapped questions inside getquestions", mappedQuestions)

//     return mappedQuestions;
   
//   } catch (error) {
//     console.error("Error fetching questions", error);
//     return null;
//   }
// };

// export default getQuestions;

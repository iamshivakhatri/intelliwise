import prismadb from "@/lib/prismadb";

// import {Question} from '@/types'


// const getQuestions = async (): Promise<Question[]> => {
//     const res = await fetch('http://10.24.109.135:5000/get_data');
//     const data = await res.json();
//     console.log("This is the data from the API in getQuestions", data)
//     return data;
// };

// export default getQuestions


const getQuestions = async () => {
    const questions = await prismadb.question.findMany()
    console.log("This is the data from the API in getQuestions", questions)
    return questions;
   
}

export default getQuestions
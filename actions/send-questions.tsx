import { Question } from '@/types';

const sendQuestions = async (inputvalue: Question): Promise<Question | null> => {
  try {
    


    const res = await fetch('http://10.24.109.135:5000/store_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Add any other headers as needed
      },
      body: JSON.stringify(inputvalue)
    });

    // Check if the response was successful
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    // Assuming the server sends back JSON data
    

  } catch (error) {
    console.error("Error fetching products", error);
    return null;
  }
  return null;
};

export default sendQuestions;

import { Question } from '@/types';

const getProducts = async (inputvalue: String): Promise<Question | null> => {
  try {
    
    const requestData = {
      "youtube_url": inputvalue
    };
    console.log("This is the request data", requestData);

    const res = await fetch('http://10.15.214.52:5000/generate-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
        // Add any other headers as needed
      },
      body: JSON.stringify(requestData)
    });

    // Check if the response was successful
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    // Assuming the server sends back JSON data
    const data: Question = await res.json();

    console.log("This is data from the API in the action", data);
    
    return data;
  } catch (error) {
    console.error("Error fetching products", error);
    return null;
  }
};

export default getProducts;

import { ProductListResponse } from '@/types';

const getProducts = async (inputvalue: string): Promise<ProductListResponse | null> => {
  try {
    const textToSend = "Hello sajan. I am a bot. I am here to help you. How can I help you today?";
    
    const requestData = {
      text: textToSend
    };

    const res = await fetch('http://127.0.0.1:5000/api/questions', {
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
    const data: ProductListResponse = await res.json();

    console.log("This is data from the API in the action", JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.error("Error fetching products", error);
    return null;
  }
};

export default getProducts;

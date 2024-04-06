"use client";
import React, { useEffect } from 'react';
import axios from 'axios';
import UserCard from './components/userCard'; // Capitalize UserCard



const Results = () => {
    const [userData, setUserData] = React.useState([]);

    type userData = {
        userId: string;
        score: number;
    };

    type name = string;

    useEffect( () =>  {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/score');
                console.log('User data:(response)', response);
                setUserData(response.data);
                console.log('User data:', response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
        console.log('userData has changed:', userData);
    }, [userData]); 

    const handleClearUserData = () => {
        localStorage.removeItem('userData');
        setUserData([]);
    };

    return (  
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
    
                <div>
                {userData
                    .sort((a, b) => b.score - a.score) // Sort userData array in descending order based on score
                    .map((user, index) => (
                    <UserCard key={index} userId={user.userId} score={user.score} /> 
                ))}
                </div>
                

             
        </div>
    );
}
 
export default Results;

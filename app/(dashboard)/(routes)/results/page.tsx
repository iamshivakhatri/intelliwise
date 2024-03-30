"use client";
import React, { useEffect } from 'react';
import { useGlobalContext } from '@/context/global-context';

const Results = () => {
    const { userData, setUserData } = useGlobalContext();

    useEffect(() => {
        console.log('userData has changed:', userData);
    }, [userData]); 

    const handleClearUserData = () => {
        localStorage.removeItem('userData');
        setUserData([]);
    };

    return (  
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
            <button 
                className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={handleClearUserData}
            >
                Clear User Data
            </button>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">User ID</th>
                        <th className="border border-gray-400 px-4 py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="border border-gray-400 px-4 py-2">{user.userId}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default Results;

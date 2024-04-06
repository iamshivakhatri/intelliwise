import React from 'react';
import Avatar from "@/components/ui/avatar";

interface UserCardProps {
  userId: string;
  score: number;
}

const UserCard: React.FC<UserCardProps> = ({ userId, score }) => {
  return (
    <div className=" w-full  flex items-center p-4 border rounded-md shadow-md mb-4  md:w-4/3 lg:w-9/7 hover:bg-sky-700">
      <Avatar src="https://github.com/shadcn.png"/>

      <div className="flex-grow">
        <p className="text-lg font-semibold">{userId}</p>
        <p className="text-sm">Score: {score}</p>
      </div>
    </div>
  );
};

export default UserCard;

import React from 'react';

const Avatar = ({ src }) => {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden mr-5">
      <img
        className="object-cover w-full h-full"
        src={src}
        alt="Avatar"
      />
    </div>
  );
};

export default Avatar;

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const ConfettiButton = ({ isExploding }: { isExploding: boolean }) => {
  

  const explodeConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };
  if (isExploding) {
    explodeConfetti();
  }

  const handleButtonClick = () => {
    explodeConfetti();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        
      </button>
      {isExploding && (
        <canvas
          id="confetti-canvas"
          style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
          width={window.innerWidth}
          height={window.innerHeight}
        ></canvas>
      )}
    </div>
  );
};

export { ConfettiButton }; // Export ConfettiButton component

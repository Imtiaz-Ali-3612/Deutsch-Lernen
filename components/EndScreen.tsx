
import React from 'react';

interface EndScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  let message = '';
  if (percentage === 100) {
    message = 'Ausgezeichnet! Perfect score!';
  } else if (percentage >= 80) {
    message = 'Sehr gut! Excellent work!';
  } else if (percentage >= 50) {
    message = 'Gut gemacht! Keep practicing!';
  } else {
    message = 'Übung macht den Meister! Practice makes perfect!';
  }

  return (
    <div className="text-center text-white bg-slate-800 p-8 rounded-xl shadow-2xl">
      <h2 className="text-4xl font-bold text-teal-400">Quiz Complete!</h2>
      <p className="text-xl mt-4">{message}</p>
      <div className="my-8">
        <p className="text-6xl font-bold">
          {score} / {totalQuestions}
        </p>
        <p className="text-2xl text-slate-300">({percentage}%)</p>
      </div>
      <button
        onClick={onRestart}
        className="mt-4 px-8 py-4 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;

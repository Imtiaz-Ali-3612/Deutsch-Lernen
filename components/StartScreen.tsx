
import React from 'react';
import BookOpenIcon from './icons/BookOpenIcon';
import { QUIZ_LENGTH } from '../constants';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center text-white">
      <BookOpenIcon className="w-24 h-24 mx-auto text-teal-400" />
      <h1 className="text-5xl font-bold mt-4">Deutsch-Quiz</h1>
      <p className="text-slate-300 mt-4 max-w-md mx-auto">
        Test your German skills with an AI-generated quiz! Each round has {QUIZ_LENGTH} questions.
      </p>
      <button
        onClick={onStart}
        className="mt-8 px-8 py-4 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;

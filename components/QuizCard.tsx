
import React from 'react';
import { Question } from '../types';

interface QuizCardProps {
  questionData: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

const QuizCard: React.FC<QuizCardProps> = ({
  questionData,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  selectedAnswer,
  isCorrect,
}) => {
  const { question, options, correctAnswer, explanation } = questionData;

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) {
      return "bg-slate-700 hover:bg-slate-600";
    }
    if (option === correctAnswer) {
      return "bg-green-600 border-green-500";
    }
    if (option === selectedAnswer && !isCorrect) {
      return "bg-red-600 border-red-500";
    }
    return "bg-slate-800 opacity-60 cursor-not-allowed";
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl">
      {/* Progress and Question Counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-slate-300 mb-2">
          <span>Question {questionNumber} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <p className="text-slate-400 text-lg">Translate this word:</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">{question}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={!!selectedAnswer}
            className={`w-full p-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 border-2 border-transparent ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback and Next Button */}
      {selectedAnswer && (
        <div className="mt-6 text-center animate-fade-in">
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-teal-400">Explanation</h3>
            <p className="text-slate-200 mt-2">{explanation}</p>
          </div>
          <button
            onClick={onNext}
            className="mt-6 px-10 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-colors duration-300"
          >
            {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;

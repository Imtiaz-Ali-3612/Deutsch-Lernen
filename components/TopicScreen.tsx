import React, { useState } from 'react';
import SparklesIcon from './icons/SparklesIcon';
import DashboardIcon from './icons/DashboardIcon';

interface TopicScreenProps {
  onGenerate: (topic: string) => void;
  onViewDashboard: () => void;
  isLoading: boolean;
  error: string | null;
}

const TopicScreen: React.FC<TopicScreenProps> = ({ onGenerate, onViewDashboard, isLoading, error }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onGenerate(topic.trim());
    }
  };

  return (
    <div className="text-center text-white bg-slate-800 p-8 rounded-xl shadow-2xl animate-fade-in">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-400">AI Deutsch-Lernpartner</h1>
      <p className="text-slate-300 mt-4 max-w-md mx-auto">
        What topic would you like to read about in German today?
      </p>
      <p className="text-slate-400 mt-1 text-sm max-w-md mx-auto">
        (e.g., "Die Alpen", "Berliner Mauer", "Deutsche Autos")
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          disabled={isLoading}
          className="w-full sm:w-80 px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
          aria-label="Article topic"
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
        >
          <SparklesIcon className="w-5 h-5" />
          <span>{isLoading ? 'Generating...' : 'Generate Article'}</span>
        </button>
      </form>
       {error && <p className="text-red-400 text-center mt-4 animate-shake">{error}</p>}

      <div className="mt-8 border-t border-slate-700 pt-6">
         <button
          onClick={onViewDashboard}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-lg hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed mx-auto"
        >
          <DashboardIcon className="w-5 h-5" />
          <span>My Articles</span>
        </button>
      </div>
    </div>
  );
};

export default TopicScreen;
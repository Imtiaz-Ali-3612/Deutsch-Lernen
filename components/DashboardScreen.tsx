import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';
import SparklesIcon from './icons/SparklesIcon';

interface DashboardScreenProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onNewArticle: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ articles, onReadArticle, onDeleteArticle, onNewArticle }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">My Article Library</h1>
        <button
          onClick={onNewArticle}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
        >
          <SparklesIcon className="w-5 h-5" />
          <span>New Article</span>
        </button>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onRead={onReadArticle}
              onDelete={onDeleteArticle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-slate-800 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">Your library is empty.</h2>
          <p className="text-slate-400 mt-2">Generate your first article to start learning!</p>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;

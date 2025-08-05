import React from 'react';
import { Article } from '../types';
import TrashIcon from './icons/TrashIcon';
import BookOpenIcon from './icons/BookOpenIcon';

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
  onDelete: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onRead, onDelete }) => {

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onRead from firing
    onDelete(article.id);
  };

  const handleRead = () => {
    onRead(article);
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden flex flex-col group transition-transform duration-300 hover:scale-105 hover:shadow-teal-500/20">
      <div className="relative">
        <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-0 left-0 p-4 text-lg font-bold text-white">{article.title}</h3>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
            <p className="text-sm text-slate-400">Topic: <span className="font-semibold text-slate-300">{article.topic}</span></p>
            <p className="text-sm text-slate-400">Created: <span className="font-semibold text-slate-300">{new Date(article.createdAt).toLocaleDateString()}</span></p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleDelete}
            aria-label={`Delete article titled ${article.title}`}
            className="p-2 text-slate-400 hover:text-red-500 rounded-full transition-colors duration-300 hover:bg-red-500/10"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleRead}
            aria-label={`Read article titled ${article.title}`}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600/50 text-teal-200 font-semibold rounded-md transition-all duration-300 hover:bg-teal-500 hover:text-white"
          >
            <BookOpenIcon className="w-5 h-5" />
            <span>Read</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

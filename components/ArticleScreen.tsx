import React, { useState, useCallback, useRef } from 'react';
import { Article, WordTranslation } from '../types';
import { getWordTranslation } from '../services/geminiService';
import WordTooltip from './WordTooltip';
import BookOpenIcon from './icons/BookOpenIcon';

interface ArticleScreenProps {
  article: Article;
  onStartQuiz: () => void;
  onBack: () => void;
  error: string | null;
}

const ArticleScreen: React.FC<ArticleScreenProps> = ({ article, onStartQuiz, onBack, error }) => {
  const [tooltip, setTooltip] = useState<{
    data: WordTranslation;
    x: number;
    y: number;
  } | null>(null);
  const [isTranslating, setIsTranslating] = useState<false | string>(false); // store word being translated
  const articleRef = useRef<HTMLDivElement>(null);

  const handleWordClick = useCallback(async (event: React.MouseEvent<HTMLSpanElement>, word: string) => {
    const cleanWord = word.replace(/[.,!?]/g, '');
    if (!cleanWord || isTranslating) return;

    setIsTranslating(cleanWord);
    setTooltip(null);

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const articleRect = articleRef.current?.getBoundingClientRect();

    if (!articleRect) return;

    try {
      const translationData = await getWordTranslation(cleanWord, article.content);
      setTooltip({
        data: translationData,
        x: rect.left + rect.width / 2 - articleRect.left,
        y: rect.top - articleRect.top,
      });
    } catch (e) {
      console.error(e);
      // Optional: Show a small error tooltip
    } finally {
      setIsTranslating(false);
    }
  }, [article.content, isTranslating]);

  const closeTooltip = () => {
    setTooltip(null);
  };
  
  const renderableContent = article.content.split(/(\s+|[.,!?])(?=\s|[.,!?]|$)/g).map((segment, index) => {
    if (segment.trim().length > 0 && !/^[.,!?]+$/.test(segment)) {
      return (
        <span
          key={index}
          className="cursor-pointer hover:bg-teal-500/20 transition-colors duration-200 rounded px-0.5 -mx-0.5"
          onClick={(e) => handleWordClick(e, segment)}
        >
          {isTranslating === segment.replace(/[.,!?]/g, '') ? (
            <span className="animate-pulse">{segment}</span>
          ) : (
            segment
          )}
        </span>
      );
    }
    return segment;
  });

  return (
    <div className="bg-slate-800 p-4 sm:p-8 rounded-xl shadow-2xl w-full animate-fade-in relative" ref={articleRef}>
      {tooltip && <WordTooltip {...tooltip} onClose={closeTooltip} />}
      
      <button onClick={onBack} className="absolute top-4 left-4 flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
        &larr; Back to Dashboard
      </button>

      <img src={article.imageUrl} alt={article.title} className="w-full h-48 sm:h-64 object-cover rounded-lg my-12 shadow-lg" />
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">{article.title}</h1>
      <div className="text-slate-200 text-lg leading-relaxed space-y-4 prose prose-invert max-w-none">
        <p>{renderableContent}</p>
      </div>
       {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      <div className="text-center mt-8">
        <button
          onClick={onStartQuiz}
          className="px-8 py-4 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
        >
          I'm Ready! Start the Quiz
        </button>
      </div>
    </div>
  );
};

export default ArticleScreen;
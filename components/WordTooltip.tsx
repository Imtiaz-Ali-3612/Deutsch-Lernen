import React from 'react';
import { WordTranslation } from '../types';
import CloseIcon from './icons/CloseIcon';

interface WordTooltipProps {
  data: WordTranslation;
  x: number;
  y: number;
  onClose: () => void;
}

const WordTooltip: React.FC<WordTooltipProps> = ({ data, x, y, onClose }) => {
  return (
    <div
      className="absolute z-10 w-64 p-3 bg-slate-900 text-white rounded-lg shadow-2xl border border-slate-700 transform -translate-x-1/2 -translate-y-full mt-[-8px] animate-fade-in-up"
      style={{ left: `${x}px`, top: `${y}px` }}
      role="tooltip"
    >
      <button
        onClick={onClose}
        className="absolute top-1 right-1 p-1 text-slate-400 hover:text-white transition-colors"
        aria-label="Close tooltip"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
      <p className="text-lg font-bold text-teal-400">{data.translation}</p>
      <p className="text-sm text-slate-300 mt-1">{data.explanation}</p>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-slate-900"></div>
    </div>
  );
};

export default WordTooltip;
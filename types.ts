export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Article {
    title: string;
    content: string;
}

export interface WordTranslation {
    translation: string;
    explanation: string;
}

export type GameState = 'topic_selection' | 'generating_article' | 'reading' | 'generating_quiz' | 'quizzing' | 'finished';
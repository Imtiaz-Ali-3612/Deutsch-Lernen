import React, { useState, useCallback } from 'react';
import { Question, GameState, Article } from './types';
import { generateArticleAndImage, generateQuizFromArticle } from './services/geminiService';
import TopicScreen from './components/TopicScreen';
import LoadingSpinner from './components/LoadingSpinner';
import ArticleScreen from './components/ArticleScreen';
import QuizCard from './components/QuizCard';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('topic_selection');
  const [topic, setTopic] = useState<string>('');
  const [article, setArticle] = useState<Article | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const handleGenerateArticle = useCallback(async (selectedTopic: string) => {
    setTopic(selectedTopic);
    setGameState('generating_article');
    setLoadingMessage('Generating your article and image...');
    setError(null);
    try {
      const { article, imageUrl } = await generateArticleAndImage(selectedTopic);
      setArticle(article);
      setImageUrl(imageUrl);
      setGameState('reading');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      console.error("Failed to generate article:", errorMessage);
      setError(errorMessage);
      setGameState('topic_selection');
    }
  }, []);

  const handleStartQuiz = useCallback(async () => {
    if (!article) return;
    setGameState('generating_quiz');
    setLoadingMessage('Creating your custom quiz...');
    setError(null);
    try {
      const fetchedQuestions = await generateQuizFromArticle(article.content);
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setGameState('quizzing');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      console.error("Failed to start quiz:", errorMessage);
      setError(errorMessage);
      setGameState('reading'); // Go back to reading if quiz generation fails
    }
  }, [article]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setGameState('finished');
    }
  };

  const handleRestart = () => {
    setGameState('topic_selection');
    setArticle(null);
    setImageUrl(null);
    setQuestions([]);
    setError(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case 'generating_article':
      case 'generating_quiz':
        return <LoadingSpinner message={loadingMessage} />;
      case 'reading':
        if (article && imageUrl) {
            return <ArticleScreen article={article} imageUrl={imageUrl} onStartQuiz={handleStartQuiz} error={error} />;
        }
        // Fallback if state is reading but data is missing
        handleRestart(); 
        return null;
      case 'quizzing':
        return (
          <QuizCard
            questionData={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
        );
      case 'finished':
        return <EndScreen score={score} totalQuestions={questions.length} onRestart={handleRestart} />;
      case 'topic_selection':
      default:
        return (
            <TopicScreen onGenerate={handleGenerateArticle} isLoading={gameState === 'generating_article'} error={error} />
        );
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-900 font-sans">
      <div className="w-full max-w-3xl">
        {renderContent()}
      </div>
    </main>
  );
};

export default App;
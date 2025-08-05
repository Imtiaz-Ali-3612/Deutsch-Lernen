import { GoogleGenAI, Type } from "@google/genai";
import { QUIZ_LENGTH, GEMINI_MODEL } from '../constants';
import { Question, Article, WordTranslation } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const articleSchema = {
    type: Type.OBJECT,
    properties: {
        title: { 
            type: Type.STRING,
            description: "An engaging title for the article in German."
        },
        content: { 
            type: Type.STRING,
            description: "The full article text in German, approximately 150-200 words long, suitable for an intermediate learner."
        },
    },
    required: ['title', 'content'],
};

const translationSchema = {
    type: Type.OBJECT,
    properties: {
        translation: {
            type: Type.STRING,
            description: "The English translation of the German word."
        },
        explanation: {
            type: Type.STRING,
            description: "A simple, one-sentence explanation of the word's meaning or usage."
        }
    },
    required: ['translation', 'explanation'],
};

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: 'A German word from the article.',
      },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'An array of 4 English translations for the German word.',
      },
      correctAnswer: {
        type: Type.STRING,
        description: 'The correct English translation from the options array.',
      },
      explanation: {
        type: Type.STRING,
        description: 'A brief explanation of the word, its usage, or why the answer is correct.'
      }
    },
    required: ['question', 'options', 'correctAnswer', 'explanation'],
  },
};

export const generateArticleAndImage = async (topic: string): Promise<{ article: Article; imageUrl: string; }> => {
    const articlePrompt = `You are a German author writing for intermediate language learners. Write a short, engaging article (around 150-200 words) about the topic: "${topic}". The article should have a title. Return it as JSON.`;
    const imagePrompt = `A vibrant, digital art style illustration about ${topic}. Clean, simple, and focused on the main subject.`;

    try {
        const [articleResponse, imageResponse] = await Promise.all([
            ai.models.generateContent({
                model: GEMINI_MODEL,
                contents: articlePrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: articleSchema,
                },
            }),
            ai.models.generateImages({
                model: 'imagen-3.0-generate-002',
                prompt: imagePrompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '16:9',
                },
            })
        ]);

        const articleJson = articleResponse.text.trim();
        const article: Article = JSON.parse(articleJson);

        if (!article.title || !article.content) {
            throw new Error("Generated article is missing title or content.");
        }

        const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

        return { article, imageUrl };
    } catch(error) {
        console.error("Error generating article and image:", error);
        throw new Error("Failed to generate content. Please try a different topic.");
    }
};

export const getWordTranslation = async (word: string, context: string): Promise<WordTranslation> => {
    const prompt = `Provide a simple English translation and a one-sentence explanation for the German word "${word}". The word appears in the context of the following article: "${context}". Return as JSON.`;
    
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: translationSchema,
            },
        });
        const translationJson = response.text.trim();
        return JSON.parse(translationJson);
    } catch(error) {
        console.error(`Error translating word "${word}":`, error);
        throw new Error("Could not translate the selected word.");
    }
};

export const generateQuizFromArticle = async (articleContent: string): Promise<Question[]> => {
  const prompt = `You are an expert German language tutor. Based on the following German article, create ${QUIZ_LENGTH} multiple-choice quiz questions focusing on important or tricky vocabulary. For each question, provide the German word from the article, four plausible but distinct English options, the correct English translation, and a brief explanation. Article: "${articleContent}". Return the data in a valid JSON array.`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);

    if (Array.isArray(questions) && questions.length > 0) {
      return questions;
    } else {
      throw new Error("Failed to generate valid quiz questions from the article.");
    }
  } catch (error) {
    console.error("Error generating quiz from article:", error);
    throw new Error("Failed to create a quiz for this article.");
  }
};
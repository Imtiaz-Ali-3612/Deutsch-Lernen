# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# AI German Article Generator & Quizzer

An interactive web application designed to help intermediate German learners improve their vocabulary and reading comprehension through AI-generated content. This app provides a dynamic and engaging learning experience by creating personalized articles and quizzes on any topic you choose.

![Demo](https://storage.googleapis.com/genai-assets/german-quiz-app.gif)

## ✨ Features

-   **Topic-Based Learning**: Enter any topic (e.g., "Die Alpen", "Deutsche Autos") and get a custom-generated German article.
-   **AI-Powered Content**: Utilizes the Google Gemini API to create unique articles and relevant cover images for a rich, visual learning experience.
-   **Interactive Reading**: Click on any word within the article to get an instant English translation and a simple, contextual explanation.
-   **Personalized Quizzes**: After reading, test your knowledge with a multiple-choice quiz that is dynamically generated from the article's key vocabulary.
-   **Persistent Article Library**: All generated articles are automatically saved to your personal dashboard using Firebase Firestore.
-   **Dashboard Management**: Easily browse, re-read, or delete articles from your collection at any time. Your library is saved across sessions.
-   **Modern & Responsive UI**: Built with React and Tailwind CSS for a clean, intuitive experience on any device.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript
-   **Styling**: Tailwind CSS
-   **AI**: Google Gemini API (`gemini-2.5-flash` for text, `imagen-3.0-generate-002` for images)
-   **Database**: Google Firebase (Firestore)
-   **Runtime**: Runs directly in the browser via ES Modules and an `importmap`. No build step required!

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You only need a modern web browser (like Chrome, Firefox, or Edge).

### Configuration

**Step 1: Firebase Setup**

1.  Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2.  In your Project Settings, add a new **Web App**.
3.  Firebase will provide you with a `firebaseConfig` object. Copy this object.
4.  Paste your copied `firebaseConfig` object into the `firebaseConfig.ts` file, replacing the placeholder values.
5.  In the Firebase console, navigate to **Build > Firestore Database**. Create a new database and choose to start in **test mode** (this allows the app to read and write data without authentication setup).

**Step 2: Google Gemini API Key Setup**

1.  Obtain an API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Open the `config.ts` file.
3.  Paste your API key into the `API_KEY` constant, replacing the placeholder `"YOUR_GEMINI_API_KEY"`.

### Running the Application

Once the configuration is complete, you can run the application by simply opening the `index.html` file in your browser.

For the best experience (to avoid potential CORS issues with local files), it's recommended to use a simple local server. If you are using VS Code, the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension is a great option.

## 📁 Project Structure

Here is a high-level overview of the project's structure:

```
.
├── index.html            # Main HTML entry point with importmap for dependencies
├── index.tsx             # React application root
├── App.tsx               # Main application component, manages state and logic
├── metadata.json         # Application metadata
├── config.ts             # Central configuration for API keys and constants
├── firebaseConfig.ts     # Firebase project configuration (NEEDS USER INPUT)
├── types.ts              # TypeScript type definitions
├── services/
│   ├── geminiService.ts    # Handles all API calls to Google Gemini
│   └── firebaseService.ts  # Handles all database interactions with Firestore
└── components/
    ├── ArticleScreen.tsx   # Displays the generated article and handles word translation
    ├── DashboardScreen.tsx # Displays the library of saved articles
    ├── QuizCard.tsx        # Displays a single quiz question
    ├── TopicScreen.tsx     # The initial screen for user input
    └── ...                 # Other UI components and icons
```

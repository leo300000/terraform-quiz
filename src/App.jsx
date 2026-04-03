import { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const startQuiz = (theme) => {
    setSelectedTheme(theme);
    setScreen("quiz");
  };

  const finishQuiz = (results) => {
    setQuizResults(results);
    setScreen("results");
  };

  const restart = () => {
    setScreen("home");
    setSelectedTheme(null);
    setQuizResults(null);
  };

  return (
    <div className="app">
      {screen === "home" && <Home onStart={startQuiz} />}
      {screen === "quiz" && (
        <Quiz theme={selectedTheme} onFinish={finishQuiz} onExit={restart} />
      )}
      {screen === "results" && (
        <Results
          results={quizResults}
          theme={selectedTheme}
          onRestart={restart}
          onRetry={() => startQuiz(selectedTheme)}
        />
      )}
    </div>
  );
}

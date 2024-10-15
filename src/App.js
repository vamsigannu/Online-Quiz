import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [score, setScore] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  const handleSignupSuccess = () => {
    setIsSigningUp(false); 
  };

  const handleQuizComplete = (quizScore, time) => {
    setScore(quizScore);
    setRemainingTime(time);
    setIsAuthenticated(false); 
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <Quiz onQuizComplete={handleQuizComplete} />
      ) : isSigningUp ? (
        <Signup onSignupSuccess={handleSignupSuccess} onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Login onLogin={setIsAuthenticated} onSignup={() => setIsSigningUp(true)} />
      )}
      {score !== null && (
        <div className="result">
          <h2>Your Score: {score}</h2>
          <p>Time Remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}</p>
          <button onClick={() => window.location.reload()}>Retry Quiz</button>
        </div>
      )}
    </div>
  );
}

export default App;

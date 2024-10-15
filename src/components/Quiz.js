import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Quiz.css';

const Quiz = ({ onQuizComplete }) => {
  const questions = useMemo(() => [
    { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
    { question: 'What is the capital of France?', options: ['Rome', 'Paris', 'Berlin', 'Madrid'], answer: 'Paris' },
    { question: 'What is the square root of 16?', options: ['2', '4', '8', '6'], answer: '4' },
    { question: 'What is the capital of Germany?', options: ['Berlin', 'Vienna', 'Amsterdam', 'Brussels'], answer: 'Berlin' },
    { question: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], answer: 'Jupiter' },
    { question: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'Mark Twain', 'William Shakespeare', 'Jane Austen'], answer: 'William Shakespeare' },
    { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Fe', 'Pb'], answer: 'Au' },
    { question: 'What is the freezing point of water?', options: ['0°C', '100°C', '32°F', '212°F'], answer: '0°C' },
    { question: 'What is the capital of Italy?', options: ['Venice', 'Rome', 'Florence', 'Milan'], answer: 'Rome' },
    { question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], answer: 'Carbon Dioxide' },
  ], []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [timer, setTimer] = useState(600);

  const handleOptionSelect = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = useCallback(() => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].answer ? acc + 1 : acc;
    }, 0);
    onQuizComplete(score, timer);
  }, [selectedAnswers, questions, onQuizComplete, timer]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [handleSubmit]);

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      <div className="timer">
        Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
      </div>
      <div className="question-container">
        <p>{questions[currentQuestionIndex].question}</p>
        <div className="options">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option)}
              style={{
                backgroundColor: selectedAnswers[currentQuestionIndex] === option ? '#f39c12' : '#4CAF50',
                color: 'white',
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={currentQuestionIndex === questions.length - 1 ? handleSubmit : handleNextQuestion}>
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;

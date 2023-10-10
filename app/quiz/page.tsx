'use client'
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ChatWidget from "../components/ChatWidget";
import quizData from '../../uploads/questions.json'

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const [chatOpen, setChatOpen] = useState(true);

  const handleNextQuestion = () => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full p-4 overflow-y-auto">
        {quizCompleted ? (
          <div>
            <h1 className="text-3xl text-center">Quiz Completed</h1>
            <p className="text-xl text-center">
              Your score: <span className="text-green-600">{score}</span> out of{" "}
              <span className="text-blue-600">{quizData.length}</span>
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                router.push(`/pdfUpload`);
              }}
            > 
              Generate another quiz!
            </button>
          </div>
        ) : (
          <div className="grid items-center justify-center">
            <h1 className="text-3xl text-center">Quiz</h1>
            <p className="text-xl text-center">
              Question <span className="text-blue-600">{currentQuestion + 1}</span> of{" "}
              <span className="text-blue-600">{quizData.length}</span>
            </p>
            <h3 className="text-3xl font-bold">{quizData[currentQuestion].question}</h3>
            <ul>
              {quizData[currentQuestion].options.map((option: string, index: number) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`cursor-pointer hover:bg-gray-200 p-2 rounded text-center ${
                    selectedOption === option ? "bg-blue-300" : ""
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {chatOpen && <div className="w-1/4 p-4 overflow-y-auto">
        <ChatWidget />
      </div>}
    </div>
  );
};

export default QuizPage;

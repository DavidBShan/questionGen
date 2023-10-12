'use client'
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ChatWidget from "../components/ChatWidget";
import quizData from '../../uploads/questions.json'
import Image from "next/image";

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctState, setCorrectState] = useState("nothing");
  const handleOptionSelect = (option: string) => {
    if (correctState === "nothing") {
      setSelectedOption(option);
    } 
  };
  const [chatOpen, setChatOpen] = useState(false);

  const handleNextQuestion = () => {

    if (correctState === "nothing") {
      if (selectedOption === quizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
        setCorrectState("correct");
      }else{
        setCorrectState("incorrect");
      }
    } else {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setCorrectState("nothing");
        } else {
          setQuizCompleted(true);
        }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:overflow-y-auto no-scrollbar">
        {quizCompleted ? (
         <div className="flex flex-col items-center justify-center gap-8 md:gap-0 h-screen mx-6 md:mx-[35%]">
         <div className="text-center">
           <h1 className="text-3xl md:text-5xl font-bold">Quiz Completed</h1>
           <p className="text-lg md:text-2xl font-semibold">
             Your score: <span className="text-green-400 font-semibold">{score}</span> out of{" "}
             <span className="text-blue-400 font-semibold">{quizData.length}</span>
           </p>
         </div>
       
         <div className="text-center mt-20 mx-7 md:mx-0">
           <Image src={"/arrow.svg"} height={3412 / 7} width={2376 / 7} alt="" />
           <p className="pt-6 text-sm md:text-lg">Practice lets you hit your targets.</p>
         </div>
       
         <div className="text-center grid gap-8 mt-8">
           <p className="text-xl md:text-3xl mx-auto">Want to ace your next test? Keep practicing with more questions.</p>
       
           <button
             className="bg-aceflow-blue text-lg md:text-2xl hover:bg-blue-700 text-white 
             font-bold py-3 px-4 rounded-lg mx-auto"
             onClick={() => {
               router.push(`/pdfUpload`);
             }}
           >
             Generate another quiz.
           </button>
       
           <p className="italic font-medium text-sm md:text-lg">Mastery is close.</p>
         </div>
       </div>
       
       
        ) : (
          <div className="grid gap-8 md:gap-14 items-center justify-center">
            
            <div className="space-y-10 md:space-y-20">
              <div className="mt-8">
                <h1 className="text-xl md:text-3xl text-center font-bold">Quiz</h1>
                <p className="text-lg md:text-2xl text-center font-semibold">
                  Question <span className="text-blue-600 font-semibold">{currentQuestion + 1}</span> of{" "}
                  <span className="text-blue-600">{quizData.length}</span>
                </p>
              </div>
              
              <div className="grid gap-8">
                <h3 className="px-8 md:px-0 text-xl md:text-4xl  font-bold text-center">{quizData[currentQuestion].question}</h3>

                <ul className="flex flex-wrap gap-6 justify-center">
                  {quizData[currentQuestion].options.map((option: string, index: number) => (
                    <li
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`
                        flex-shrink-0 cursor-pointer
                        rounded-lg text-center
                        p-2 md:p-3
                        text-lg md:text-2xl md:font-medium 
                        w-[75%] md:w-1/2
                        outline outline-2 outline-aceflow-blue 
 
                        ${correctState === "nothing" && selectedOption !== option ? "hover:bg-gray-200" : "cursor-default"}

                        ${correctState === "nothing" && selectedOption === option ? "bg-blue-200" : ""}
                        ${correctState === "correct" && selectedOption === option ? "bg-green-100 outline-green-600" : ""}
                        ${correctState === "incorrect" && selectedOption === option ? "bg-red-100 outline-red-600" : ""}
                        `}
                    >
                      <span className="mr-2">{String.fromCharCode(65 + index)}.</span>{option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {(chatOpen) ? 
            (<div className="text-md md:text-xl text-center">
              You&apos;ve got this. <button 
                  className='cursor font-medium text-aceflow-blue underline'
                  onClick={()=>{setChatOpen(false)}}
                >
                  Remove AI tutor
                </button>
            </div>)
            :
            (<div className="text-md md:text-xl text-center">
              Stuck? <button 
                  className='cursor font-medium text-aceflow-blue underline'
                  onClick={()=>{setChatOpen(true)}}
                >
                  Ask your AI tutor for help
                </button>
            </div>)
            }

            <button
              className="bg-aceflow-blue text-lg md:text-2xl hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-32 md:w-40 mx-auto"
              onClick={handleNextQuestion}
            >
              {correctState === "nothing" ? <div>Check</div>: <div>Next</div>}
            </button>
          </div>
        )}
        <div>
        {correctState === "correct" ? "correct" : correctState === "incorrect" ? "incorrect" : "do a question first"}
        </div>
      </div>

      {!chatOpen || !quizCompleted && <div className="md:w-[45%] lg:w-[35%] xl:w-1/4 p-4 md:overflow-y-auto">
        <ChatWidget />
      </div>}
    </div>
  );
};

export default QuizPage;
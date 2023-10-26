'use client'
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from '../Context/store';
import ChatWidget from "../components/ChatWidget";
import Image from "next/image";
import { timeQuiz } from "../components/Checkbox";
import StopwatchComponent, { timeTaken } from "../components/Stopwatch";

const useQuizPage: React.FC = () => {
  const router = useRouter();
  const {data, setData, messages, setMessages, pdfText, setPdfText} = useGlobalContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctState, setCorrectState] = useState("nothing");

  const timedQuiz = timeQuiz;

  console.log(data);
  const handleOptionSelect = (option: string) => {
    if (correctState === "nothing") {
      setSelectedOption(option);
    } 
  };
  const [chatOpen, setChatOpen] = useState(false);
  
  const handleNextQuestion = () => {

    if (correctState === "nothing") {
      if (selectedOption === data[currentQuestion].correctAnswer) {
        setScore(score + 1);
        setCorrectState("correct");
      }else{
        setCorrectState("incorrect");
      }
    } else {
        if (currentQuestion < data.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setCorrectState("nothing");
        } else {
          setQuizCompleted(true);
        }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center md:flex-row">
      <div className="no-scrollbar w-full md:overflow-y-auto">
        {quizCompleted ? (
         <div className="mx-auto flex h-fit max-w-screen-sm flex-col items-center justify-center gap-8">
         <div className="text-center">
           <h1 className="pt-10 text-3xl font-bold md:text-5xl">Quiz Completed</h1>
           <p className="text-lg font-semibold md:text-2xl">
             Your score: <span className="font-semibold text-green-400">{score}</span> out of{" "}
             <span className="font-semibold text-blue-400">{data.length}</span>
           </p>
           {(timedQuiz ?
          <div className="text-lg font-semibold md:text-2xl">Time taken {timeTaken.toString()}</div>
          : null)}
         </div>
       
         <div className="mx-7 text-center md:mx-0 md:mt-20">
           <Image src={"/arrow.svg"} height={3412 / 7} width={2376} alt="" className="h-48 w-48 md:h-72 md:w-72"/>
           <p className="pt-6 text-sm md:text-lg">Practice lets you hit your targets.</p>
         </div>
       
         <div className="mt-8 grid gap-8 text-center">
           <p className="mx-auto text-xl md:text-3xl">Want to ace your next test? Keep practicing with more questions.</p>
       
           <button
             className="mx-auto rounded-lg bg-aceflow-blue px-4 py-3 
             text-lg font-bold text-white hover:bg-blue-700 md:text-2xl"
             onClick={() => {
               router.push(`/pdfUpload`);
             }}
           >
             Generate another quiz.
           </button>
       
           <p className="text-sm font-medium italic md:text-lg">Mastery is close.</p>
         </div>
       </div>
       
       
        ) : (
          <div className="grid items-center justify-center gap-8 md:gap-14">
            
         {(timedQuiz ?
          <div className="pb-20 md:pb-0"><StopwatchComponent/>
          </div>
          : null)}

            <div className="space-y-10 md:space-y-20">
              <div className="mt-8">
                <h1 className="text-center text-xl font-bold md:text-3xl">Quiz</h1>
                <p className="text-center text-lg font-semibold md:text-2xl">
                  Question <span className="font-semibold text-blue-600">{currentQuestion + 1}</span> of{" "}
                  <span className="text-blue-600">{data.length}</span>
                </p>
              </div>
              
              <div className="grid gap-8">
                <h3 className="px-8 text-center text-xl font-bold  md:px-0 md:text-4xl">{data[currentQuestion].question}</h3>

                <ul className="flex flex-wrap justify-center gap-6">
                  {data[currentQuestion].options.map((option: string, index: number) => (
                    <li
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`
                        w-[75%] shrink-0
                        cursor-pointer rounded-lg
                        p-2 text-center
                        text-lg outline outline-2 
                        outline-aceflow-blue md:w-1/2
                        md:p-3 md:text-2xl md:font-medium 
 
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
            (<div className="text-center text-base md:text-xl">
              You&apos;ve got this. <button 
                  className='font-medium text-aceflow-blue underline'
                  onClick={()=>{setChatOpen(false)}}
                >
                  Remove AI tutor
                </button>
            </div>)
            :
            (<div className="text-center text-base md:text-xl">
              Stuck? <button 
                  className='font-medium text-aceflow-blue underline'
                  onClick={()=>{setChatOpen(true)}}
                >
                  Ask your AI tutor for help
                </button>
            </div>)
            }

            <button
              className="mx-auto w-32 rounded-lg bg-aceflow-blue px-4 py-3 text-lg font-bold text-white hover:bg-blue-700 md:w-40 md:text-2xl"
              onClick={handleNextQuestion}
            >
              {correctState === "nothing" ? <div>Check</div>: <div>Next</div>}
            </button>
          </div>
        )}
      </div>

      {!chatOpen || !quizCompleted && <div className="p-4 md:w-[45%] md:overflow-y-auto lg:w-[35%] xl:w-1/4">
        <ChatWidget />
      </div>}
    </div>
  );
};

export default useQuizPage;
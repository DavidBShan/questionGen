'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import emailjs from 'emailjs-com';
import { handleFileUpload } from '@/util/handleUpload';
import CustomFileInput from '../components/CustomFileInput';
import { useSession } from 'next-auth/react';
import Loading from './Loading';
import Navbar from '../components/Navbar';

import Checkbox from '../components/Checkbox';
import ProPrompt from '../components/ProPrompt';

const Home: React.FC = () => {
  const router = useRouter();
  const [pdfText, setPdfText] = useState(null);
  const [file, setFile] = useState<any>(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [currentState, setState] = useState('nothing');
  const [feedback, setFeedback] = useState('');
  const { data: session } = useSession();

  const handleStart = async () => {
    const userId = session?.user;
    const formData = new FormData();
    formData.set("file", file);
    const response = await fetch("/api/pdfParse", {
      method: "POST",
      body: formData,
    });
    const body = await response.json();
    console.log(body);
  };



  const [proPrompt, setProPrompt] = useState(false);

  const feedbackSubmit = async () => {
    var templateParams = {
      message: feedback
    }
    emailjs.send("service_q1ukn0j","template_dl6v2ji", templateParams, 'SQQyavWAI1jQ3uKJV')
    .then(function(response) {

    });
    setFeedback('');
    setState('submitted');
  };

  return (
    <div>
      <Navbar/>
      
      <div className="min-h-screen flex flex-col justify-center items-center">
      {currentState === 'loading' || currentState === 'submitted' ? (
        <Loading currentState={currentState} feedback={feedback} setFeedback={setFeedback} feedbackSubmit={feedbackSubmit}/>
      ) : (
        <div className="text-center ">
          {currentState === 'nothing' ? (
            <div className="w-full max-w-xl mx-auto space-y-12">
                <div>
                <div className='font-light text-sm md:text-lg pt-32'>PRACTICE QUESTIONS</div>
                <div className="text-xl md:text-4xl font-bold mb-6">
                  <span className="text-black">Master Anything With </span> <br/>
                  <span className="text-aceflow-blue">Unlimited Practice </span>
                  <span className="text-black">Questions</span>
                </div>
                
                <div className='flex flex-col justify-items items-center'>
                  <div className='w-screen flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-12'>
                    
                    <div className='w-80 md:w-[25%] grid gap-2 rounded-3xl outline outline-blue-200 
                      py-4 px-6
                      md:py-8 lg:px=10 mx-6 md:mx-0'>
                      <div className="text-3xl md:text-4xl lg:text-5xl text-blue-950 font-semibold">
                        Day {dailyStreak.toString()} 🔥
                      </div>
                      <div className="text-lg md:text-xl lg:text-2xl font-medium text-orange-500">Your Daily Streak</div>
                      <div className="text-sm lg:text-md text-gray-500">
                        Build a habit of studying each day and watch your streak rise up!
                      </div>
                    </div>

                    <form
                      onSubmit={(e) => e.preventDefault()}
                      encType="multipart/form-data"
                      className='md:w-[35%] rounded-3xl outline outline-blue-200 mx-6 md:mx-0'
                    >
                        <CustomFileInput setFile = {setFile}/> 
                    </form>

                    <div className='w-80 md:w-[25%] grid gap-2 rounded-3xl outline outline-blue-200 
                      py-4 px-6
                      md:py-8 lg:px=10 mx-6 md:mx-0'>
                      <div className="text-3xl md:text-4xl lg:text-5xl text-blue-950 font-semibold">
                        Questions
                      </div>
                      <div className="text-lg md:text-xl lg:text-2xl font-medium text-orange-500">5 Questions Left</div>
                      <div className="text-sm lg:text-md text-gray-500">
                        Get unlimited practice questions, and get unlimited success.
                        <span> <button className='underline text-aceflow-blue font-bold'>Go Pro.</button></span>
                      </div>
                    </div>
                  </div>
                </div>

              <button
                onClick={handleStart}
                className="w-[40%] mt-4 bg-aceflow-blue font-bold 
                text-xl
                md:text-2xl 
                text-white py-2 rounded-xl hover:bg-blue-600"
              >
                Make Quiz
              </button>
              </div>
              
              <div className='grid gap-2 rounded-3xl outline outline-blue-200 
                py-4 px-10
                md:py-8 md:px-20 mx-6 md:mx-0'>
                <div className="text-3xl md:text-5xl text-blue-950 font-semibold">
                  Day {dailyStreak.toString()} 🔥
                </div>
                <div className="text-lg md:text-2xl font-medium text-orange-500">Your Daily Streak</div>
                <div className="text-sm md:text-md text-gray-500">
                  Build a habit of studying each day and watch your streak rise up!
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto">
              <div className="text-5xl font-bold mb-14">Your quiz is ready!</div>
             
             {proPrompt && <>
                <div className='w-screen h-screen absolute inset-0 bg-neutral-800/70'/>
                <ProPrompt setProPrompt={setProPrompt}/>
              </>}

              <span className='text-xl font-medium'>Customize your quiz: </span>
              <div className='flex flex-col items-center justify-center'> <Checkbox label="Timed Quiz" setProPrompt={setProPrompt}/></div>

              <button
                onClick={() => {
                  router.push(`/quiz`);
                }}
                className="w-[50%] mt-14 bg-aceflow-blue font-bold text-2xl text-white py-3 rounded-xl hover:bg-blue-600"
              >
                Start Challenge
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;
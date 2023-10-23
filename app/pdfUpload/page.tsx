'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { handleFileUpload } from '../../util/handleUpload';
import emailjs from 'emailjs-com'
import CustomFileInput from '../components/CustomFileInput';
import { useSession } from 'next-auth/react';
import Loading from './Loading';
import Navbar from '../components/Navbar';
import ProPrompt from '../components/ProPrompt';
import Checkbox from '../components/Checkbox';
import { useGlobalContext } from '../Context/store';
import { getDailyStreak } from '@/util/getDailyStreak';

const useHome: React.FC = () => {
  const router = useRouter();
  const { data, setData, messages, setMessages, pdfText, setPdfText} = useGlobalContext();
  const [file, setFile] = useState<File | null>(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [currentState, setState] = useState('nothing');
  const [feedback, setFeedback] = useState('');
  const { data: session } = useSession();
  const [proPrompt, setProPrompt] = useState(false);
  const [userId, setUserId] = useState<any>(session?.user);

  useEffect(() => {
    if (userId !== undefined) {
      getDailyStreak(userId, setDailyStreak);
    }
  }, [userId]);

  const handleStart = () => {
    const userId = session?.user;
    handleFileUpload(file, setState, userId, setDailyStreak, setData, setPdfText);
    console.log(data);
  }

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
      
      <div className="flex flex-col items-center justify-center">
      {currentState === 'loading' || currentState === 'submitted' ? (
        <Loading currentState={currentState} feedback={feedback} setFeedback={setFeedback} feedbackSubmit={feedbackSubmit}/>
      ) : (
        <div className="text-center ">
          {currentState === 'nothing' ? (
            <div className="mx-auto w-full max-w-xl space-y-12">
                <div>
                <div className='pt-10 text-sm font-light md:text-lg'>PRACTICE QUESTIONS</div>
                <div className="mb-6 text-xl font-bold md:text-4xl">
                  <span className="text-black">Master Anything With </span> <br/>
                  <span className="text-aceflow-blue">Unlimited Practice </span>
                  <span className="text-black">Questions</span>
                </div>
                
                <div className='flex flex-col items-center'>
                  <div className='flex w-screen flex-col items-center justify-center gap-6 md:flex-row lg:gap-12'>
                    
                    <div className='mx-6 grid w-80 gap-2 rounded-3xl p-4 outline 
                      outline-blue-200 md:mx-0
                      md:w-[25%] md:py-8 lg:px-10'>
                      <div className="text-3xl font-semibold text-blue-950 md:text-4xl lg:text-5xl">
                        Day {dailyStreak.toString()} 🔥
                      </div>
                      <div className="text-lg font-medium text-orange-500 md:text-xl lg:text-2xl">Your Daily Streak</div>
                      <div className="text-sm text-gray-500  lg:text-base">
                        Build a habit of studying each day and watch your streak rise up!
                      </div>
                    </div>

                    <form
                      onSubmit={(e) => e.preventDefault()}
                      encType="multipart/form-data"
                      className='mx-4 rounded-3xl outline outline-blue-200 md:mx-0 md:w-[35%]'
                    >
                        <CustomFileInput setFile = {setFile}/> 
                    </form>
                  </div>
                </div>

                <button
                  onClick={()=>{handleFileUpload(file, setState, userId, setDailyStreak, setData, setPdfText);}}
                  className="mt-4 w-[40%] rounded-xl bg-aceflow-blue 
                  py-2
                  text-xl 
                  font-bold text-white hover:bg-blue-600 md:text-2xl"
                >
                  Make Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-md pt-20">
              <div className="mb-14 text-5xl font-bold">Your quiz is ready!</div>
             
             {proPrompt && <>
                <div className='absolute inset-0 h-screen w-screen bg-neutral-800/70'/>
                <ProPrompt setProPrompt={setProPrompt}/>
              </>}

              <button
                onClick={() => {
                  router.push(`/quiz`);
                }}
                className="mt-14 w-[50%] rounded-xl bg-aceflow-blue py-3 text-2xl font-bold text-white hover:bg-blue-600"
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

export default useHome;
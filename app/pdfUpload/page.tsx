'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { handleFileUpload } from '../../util/handleUpload';
import emailjs from 'emailjs-com'
import CustomFileInput from '../components/CustomFileInput';
import { useSession } from 'next-auth/react';
import Loading from './Loading';


const Home: React.FC = () => {
  const router = useRouter();
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [currentState, setState] = useState('nothing');
  const [feedback, setFeedback] = useState('');
  const { data: session } = useSession();

  const handleStart = () => {
    const userId = session?.user;
    handleFileUpload(file, setState, setPdfText, userId, setDailyStreak)
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
    <div className="min-h-screen flex flex-col justify-center items-center">
      {currentState === 'loading' || currentState === 'submitted' ? (
        <Loading currentState={currentState} feedback={feedback} setFeedback={setFeedback} feedbackSubmit={feedbackSubmit}/>
      ) : (
        <div className="text-center ">
          {currentState === 'nothing' ? (
            <div className="w-full max-w-md mx-auto space-y-12">
              <div>
              <div className='font-light text-xs md:text-md'>PRACTICE QUESTIONS</div>
              <div className="text-xl md:text-3xl font-bold mb-6">
                <span className="text-black">Master Anything With </span>
                <span className="text-aceflow-blue">Unlimited Practice </span>
                <span className="text-black">Questions</span>
              </div>
              
              <form
                onSubmit={(e) => e.preventDefault()}
                encType="multipart/form-data"
                className='rounded-3xl outline outline-blue-200 mx-6 md:mx-0'//cursor-pointer
              >
                  <CustomFileInput setFile = {setFile}/> 
              </form>

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
              <div className="text-3xl font-bold mb-6">Your quiz is ready!</div>
             
              <button
                onClick={() => {
                  router.push(`/quiz`);
                }}
                className="w-full bg-aceflow-blue font-bold text-2xl text-white py-3 rounded-xl hover:bg-blue-600"
              >
                Start Challenge
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
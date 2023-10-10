    'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { handleFileUpload } from '../../util/handleUpload';
import emailjs from 'emailjs-com'
import CustomFileInput from '../components/CustomFileInput';


const Home: React.FC = () => {
  const router = useRouter();
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [currentState, setState] = useState('nothing');
  const [feedback, setFeedback] = useState('');

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
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Are you ready to ace this?
          </h1>
          <Image src={"/loading.png"} height={3412/4} width={2376/4} alt=""/>
          <p className="text-lg mb-6">
            Your practice questions will generate in 30 seconds! Keep this
            screen open to get your practice questions.
          </p>
          {currentState === 'loading' ? (
            <div className="w-full max-w-md mx-auto">
              <label htmlFor="feedback" className="block text-lg font-semibold">
                In the meantime, let us know why you are using Aceflow:
              </label>
              <input
                type="text"
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full mt-2 border rounded-md p-2 text-gray-800 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={feedbackSubmit}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Your feedback helps us build better tools for you.
              </p>
            </div>
          ) : (
            <div className="text-2xl text-green-500 mt-6">You're awesome, thank you so much!</div>
          )}
        </div>
      ) : (
        <div className="text-center ">
          {currentState === 'nothing' ? (
            <div className="w-full max-w-md mx-auto space-y-12">
              <div>
              <div className='font-light'>PRACTICE QUESTIONS</div>
              <div className="text-3xl font-bold mb-6">
                <span className="text-black">Master Anything With </span>
                <span className="text-aceflow-blue">Unlimited Practice </span>
                <span className="text-black">Questions</span>
              </div>
              
              <form
                onSubmit={(e) => e.preventDefault()}
                encType="multipart/form-data"
                className='rounded-3xl outline outline-blue-200 '//cursor-pointer
              >
                  <CustomFileInput setFile = {setFile}/> 
              </form>

              <button
                onClick={()=>{handleFileUpload(file, setState, setPdfText);}}
                className="w-[40%] mt-4 bg-aceflow-blue font-bold text-2xl text-white py-2 rounded-xl hover:bg-blue-600"
              >
                Make Quiz
              </button>
              </div>
              
              <div className='grid gap-2 rounded-3xl outline outline-blue-200 py-8 px-20'>
                <div className="text-5xl text-blue-950 font-semibold">
                  Day {dailyStreak.toString()} 🔥
                </div>
                <div className="text-2xl font-medium text-orange-500">Your Daily Streak</div>
                <div className="text-md text-gray-500">
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

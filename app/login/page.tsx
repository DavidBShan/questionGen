'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

import { useRouter } from "next/navigation";
import BigButton from "../components/Button";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from "react";


import SignUp from '../components/authentification/SignUp';
import SignIn from '../components/authentification/SignIn';
import ForgotPassword from '../components/authentification/ForgotPassword';
import Loader from '../components/Loader';


export default function Home() {
  const router = useRouter();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      // redirect('/login');
    },
  });

  const user = session?.data?.user;

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('SignUp'); 

  useEffect(() => {
    // Check if the user is authenticated
    if (session?.data?.user) {
      router.push("/pdfUpload");
    }
  }, [session]);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50))
      setLoading(false);
    };
    checkAuthentication();
  }, [user])

 //------------------------------------------------------------Google is above, password and email is below

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  //---------------------------------------------------Returning the component below
  return (
    <div className="bg-blue-400 h-screen text-white">
      <div className="md:w-[35%] px-10 py-40">
        <h3 className="text-center md:text-left text-lg md:text-xl lg:text-2xl px-1">Welcome to Aceflow.</h3>
        <h1 className="text-center md:text-left text-xl md:text-3xl lg:text-5xl text-justify font-semibold">
          Accelerate your learning, and unlock a new future.
        </h1>
      </div>

      <div className="grid bg-white text-black flex justify-center items-center
            rounded-t-[50px] h-[75%] 
            md:rounded-tr-[0px] 
            md:rounded-l-[50px] 
            md:absolute 
            md:inset-y-0 
            md:right-0 
            md:w-[65%]  
            md:h-screen">
        
        <div className="text-xl md:text-4xl lg:text-6xl text-center font-bold pb-0 md:px-[15%] h-2">
          Your next journey starts here.
        </div>

        {loading? null : user ? (
          <div className="grid flex flex-col gap-4 ">
            <div className="flex flex-col gap-4 items-center justify-center">          
              <Loader/>
            </div>
          </div>
        ) : (
          <div>

            {(currentPage === "ForgotPassword") ? 
              (
                <div className='text-center'>
                  <ForgotPassword/>
                  <button className='cursor text-center' onClick={() => setCurrentPage('SignIn')}>
                      Remembered your password? Log in.
                  </button>
                </div>
              ) 
            : null }

            {(currentPage === "SignUp") ? (<div className='text-center'>
                <SignUp 
                  handleSignIn={() => signIn('google')} setEmail={setEmail} setPassword = {setPassword} setDisplayName = {setDisplayName}
                  email={email} password={password}
                  signUp={signUp}
                /> 
                <button 
                  className='cursor text-center'
                  onClick={() => setCurrentPage('SignIn')}
                >
                  Already have an account? Log in.
                </button>
              </div>) : null }

            {(currentPage === "SignIn") ? (<div className='text-center flex flex-col gap-2'>
                <SignIn
                  handleSignIn={() => signIn('google')} setEmail={setEmail} setPassword = {setPassword} setDisplayName = {setDisplayName}
                  email={email} password={password}
                /> 
                <button 
                      className='cursor'
                      onClick={() => setCurrentPage('SignUp')}
                    >
                      Don&apos;t have an account? Sign up.
                </button>
                <button 
                  className='cursor text-center'
                  onClick={() => setCurrentPage('ForgotPassword')}
                >
                  Forgot your password?
                </button>
              </div>   ) : null }
          </div>
        )}
      </div>
    </div>
  );
}


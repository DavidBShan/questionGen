'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

import { useRouter, redirect } from "next/navigation";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from "react";


import SignUp from '../components/authentification/SignUp';
import SignIn from '../components/authentification/SignIn';
import ForgotPassword from '../components/authentification/ForgotPassword';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';


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
    createUserWithEmailAndPassword(auth, email, password).then((auth) => {
      // Handle successful authentication
      toast.success("Account successfully created!");
      setCurrentPage("SignIn");
    })
    .catch((error) => {
      let authError = error;
      let errorCode = authError.code;
      let errorMessage = authError.message;

      console.log(authError);
      console.log(errorCode);
      console.log(errorMessage);

      if (errorCode === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else if (errorCode === "auth/email-already-in-use"){
        toast.error("This email is already in use.");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  //---------------------------------------------------Returning the component below
  return (
    <div className="h-screen w-screen bg-blue-400 text-white">
      <div className="px-4 md:px-10 py-40 md:w-[35%]">
        <h3 className="px-1 text-center text-xl md:text-left md:text-xl lg:text-2xl">Welcome to Aceflow.</h3>
        <h1 className="text-center text-2xl font-semibold md:text-left md:text-3xl lg:text-4xl">
          Accelerate your learning, and unlock a new future.
        </h1>
      </div>

      <div className="grid h-[60%] items-center justify-center rounded-t-[50px]
            bg-white text-black 
            md:absolute 
            md:inset-y-0 
            md:right-0 
            md:h-screen 
            md:w-[65%] 
            md:rounded-l-[50px]  
            md:rounded-tr-[0px]">
        
        <div className="py-4 text-center text-xl font-bold md:px-[20%] md:text-5xl lg:text-6xl">
          Your next journey starts here.
        </div>

        {loading? null : user ? (
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col items-center justify-center gap-4">          
              <Loader/>
            </div>
          </div>
        ) : (
          <div>

            {(currentPage === "ForgotPassword") ? 
              (
                <div className='text-center'>
                  <ForgotPassword/>
                  <button className='text-center' onClick={() => setCurrentPage('SignIn')}>
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
                  className='text-center'
                  onClick={() => setCurrentPage('SignIn')}
                >
                  Already have an account? Log in.
                </button>
              </div>) : null }

            {(currentPage === "SignIn") ? (<div className='flex flex-col gap-2 text-center'>
                <SignIn
                  handleSignIn={() => signIn('google')} setEmail={setEmail} setPassword = {setPassword} setDisplayName = {setDisplayName}
                  email={email} password={password}
                /> 
                <button 
                      onClick={() => setCurrentPage('SignUp')}
                    >
                      Don&apos;t have an account? Sign up.
                </button>
                <button 
                  className='text-center'
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


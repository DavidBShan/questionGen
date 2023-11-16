'use client'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { handlePayment } from '@/util/handlePayment';
import { getPremiumStatus } from '@/util/getPremiumStatus';
import { firebase_app } from '../firebase/config';
import { getAuth } from 'firebase/auth';

const Success = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [proPrompt, setProPrompt] = useState(false);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const uid = urlSearchParams.get('uid');
  const userId = urlSearchParams.get('email');

  useEffect(() => {
    const auth = getAuth(firebase_app);
  
    const checkAuth = async () => {

      console.log(auth.currentUser);
      console.log(uid);
      console.log(userId);

    
      const checkPremium = async () => {
        if (uid !== undefined) {
          console.log(uid);
          const newPremiumStatus = await getPremiumStatus(firebase_app, uid as string);
          newPremiumStatus ? handlePayment(userId) : null;
        }
      }
  
      await checkPremium();
    };
  
    checkAuth();
  }, );
  

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Payment Successful</h1>
      <p className="text-lg text-gray-700 mb-8">Your payment was processed successfully!</p>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Go back to the homepage
      </button>
    </div>
  );
};

export default Success;

'use client'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { handlePayment } from '@/util/handlePayment';

const Success = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [proPrompt, setProPrompt] = useState(false);
  const [userId, setUserId] = useState<any>(session?.user);
  useEffect(() => {
    if (session?.user !== undefined) {
      setUserId(session?.user);
      console.log(session?.user);
      handlePayment(userId);
    }
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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

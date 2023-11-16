'use client';
import { useRouter } from "next/navigation";
import { useRouter as onlineRouter } from "next/router";
import BigButton from "../components/Button";
import Image from "next/image";
import { FaCheck } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { useState, useEffect } from "react";
import { handlePayment } from "@/util/handlePayment";
import { getCheckoutUrl } from "@/util/stripePayment";
import { firebase_app } from "../firebase/config";

export default function Home() {

const router = useRouter();
const { data: session } = useSession();
const [userId, setUserId] = useState<any>(session?.user);
//This is how stripe is handled so far
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(publishableKey);

useEffect(() => {

    if (session?.user !== undefined) {
      setUserId(session?.user);
    }

  }, [userId, session]);

  const upgradeToPremium = async () => {
    const priceId = process.env.NEXT_PUBLIC_PRICE_ID;
    const checkoutUrl = await getCheckoutUrl(firebase_app, priceId as string);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium");
  };

const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-stripe-session');
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    console.log(result);
    if (result?.error) {
      alert(result.error.message);
    }else{
        console.log("success");
        alert(userId.email);
        console.log("Making this user pro: ", userId.uid);
        handlePayment(userId);
    }
  };
//-------------------------------------
return (
    <div className="mx-6 grid h-fit items-center justify-center gap-8 pt-16">

        <div className="space-y-2 text-center">
            <div className='text-sm font-light md:text-lg'>DO YOU WANT TO BE A TOP STUDENT?</div>
            <div className="flex flex-col items-center justify-center text-4xl font-bold md:flex-row md:text-6xl">
                <span className="text-black">Meet Aceflow </span>
                <div className="ml-4 px-2 text-aceflow-blue outline"> Pro+</div>
            </div>
            
            <div className="mb-6 pt-4 text-2xl font-semibold md:text-4xl">
                Go unlimited. Learn like magic.
            </div>
        </div>   

        <div className="mt-4 md:mt-16">
            <div className="mb-6 text-2xl font-semibold md:text-4xl">
                <span className="text-black">Unlock your new future with </span>
                <span className="text-aceflow-blue">Aceflow Pro+ </span>
            </div>

            <ul className="ml-4 grid gap-2 text-lg md:text-2xl">
                <li className="flex flex-row items-center gap-4">
                    <FaCheck className="h-8 w-8 text-green-500 md:h-9 md:w-9" />
                    <div>
                    <span className="font-semibold">Unlimited </span> 
                    practice questions to master concepts
                    </div>
                </li>
                
                <li className="flex flex-row items-center gap-4">
                    <FaCheck className="h-8 w-8 text-green-500 md:h-9 md:w-9" />
                    <div>
                    <span className="font-semibold">Infinite </span> 
                    messages to learn from your custom AI tutor
                    </div>
                </li>

                <li className="flex flex-row items-center gap-4">
                    <FaCheck className="h-8 w-8 text-green-500 md:h-9 md:w-9" />
                    <div>
                    <span className="font-semibold">Speed </span> 
                    up by timing your time spent on practice quizzes
                    </div>
                </li>
            </ul>
        </div>

        <div className="flex flex-col items-center justify-center">
            <div className='mx-6 mt-6 grid w-[90%] gap-6 rounded-3xl px-2 text-center outline outline-4 outline-aceflow-blue md:mx-0 md:gap-14'>
                <h1 className="mt-6 text-xl md:text-3xl">INVEST IN YOUR FUTURE</h1>
                <div className="grid gap-3">
                    <div className="justify-items flex flex-col items-center text-3xl font-medium md:text-5xl">
                        <div>
                        <span className="font-bold">Only </span> 
                        $11.99/mo
                        </div>
                        <button
                            onClick={upgradeToPremium}
                            className="mt-4 w-[70%] rounded-xl bg-aceflow-blue px-1 
                            py-3
                            text-xl 
                            font-bold text-white hover:bg-blue-600 md:w-[55%] md:py-6 md:text-4xl"
                        >
                        Go Unlimited
                    </button>
                    </div>
                    <div className="md:text-md mb-10 text-xs">
                        Backed With Learning Science | Cancel Anytime | 24/7 Customer Support
                    </div>
                </div>
            </div>
        </div>

        <button className="mb-12 md:absolute md:bottom-0 md:left-0 md:m-6 md:text-lg"
                onClick={() => {
                    router.push(`/`);
                  }}>
            Go Home
        </button>
    </div>
  )
}

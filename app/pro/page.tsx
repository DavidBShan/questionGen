'use client';
import { useRouter } from "next/navigation";
import BigButton from "../components/Button";
import Image from "next/image";
import { FaCheck } from 'react-icons/fa';

export default function Home() {

const router = useRouter();

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
                            onClick={()=>{}}
                            className="mt-4 w-[70%] rounded-xl bg-aceflow-blue px-1 
                            py-3
                            text-xl 
                            font-bold text-white hover:bg-blue-600 md:w-[55%] md:py-6 md:text-4xl"
                        >
                        Go Unlimited
                    </button>
                    </div>
                    <div className="md:text-md mb-10 text-xs font-light">
                        Backed With Learning Science | Cancel Anytime | 24/7 Customer Support
                    </div>
                </div>
            </div>
        </div>

        <button className="mb-12 font-light text-gray-500 md:absolute md:bottom-0 md:left-0 md:m-6 md:text-lg"
                onClick={() => {
                    router.push(`/`);
                  }}>
            Go Home
        </button>
    </div>
  )
}

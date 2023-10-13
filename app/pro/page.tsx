'use client';
import { useRouter } from "next/navigation";
import BigButton from "../components/Button";
import Image from "next/image";
import { FaCheck } from 'react-icons/fa';

export default function Home() {

const router = useRouter();

return (
    <div className="mx-6 pt-16 grid items-center justify-center gap-8 h-fit">

        <div className="text-center space-y-2">
            <div className='font-light text-sm md:text-lg'>DO YOU WANT TO BE A TOP STUDENT?</div>
            <div className="text-4xl md:text-6xl font-bold flex flex-col md:flex-row items-center justify-center">
                <span className="text-black">Meet Aceflow </span>
                <div className="ml-4 outline text-aceflow-blue px-2"> Pro+</div>
            </div>
            
            <div className="text-2xl md:text-4xl pt-4 mb-6 font-semibold">
                Go unlimited. Learn like magic.
            </div>
        </div>   

        <div className="mt-4 md:mt-16">
            <div className="text-2xl md:text-4xl mb-6 font-semibold">
                <span className="text-black">Unlock your new future with </span>
                <span className="text-aceflow-blue">Aceflow Pro+ </span>
            </div>

            <ul className="text-lg md:text-2xl grid gap-2 ml-4">
                <li className="flex flex-row items-center gap-4">
                    <FaCheck className="h-8 w-8 md:h-9 md:w-9 text-green-500" />
                    <div>
                    <span className="font-semibold">Unlimited </span> 
                    practice questions to master concepts
                    </div>
                </li>
                
                <li className="flex flex-row items-center gap-4">
                    <FaCheck className="h-8 w-8 md:h-9 md:w-9 text-green-500" />
                    <div>
                    <span className="font-semibold">Infinite </span> 
                    messages to learn from your custom AI tutor
                    </div>
                </li>

                <li className="flex flex-row items-center gap-4">
                    <FaCheck className="h-8 w-8 md:h-9 md:w-9 text-green-500" />
                    <div>
                    <span className="font-semibold">Speed </span> 
                    up by timing your time spent on practice quizzes
                    </div>
                </li>
            </ul>
        </div>

        <div className="flex flex-col items-center justify-center">
            <div className='rounded-3xl w-[90%] text-center outline outline-4 outline-aceflow-blue mx-6 md:mx-0 grid gap-6 md:gap-14 mt-6 px-2'>
                <h1 className="text-xl md:text-3xl mt-6">INVEST IN YOUR FUTURE</h1>
                <div className="grid gap-3">
                    <div className="text-3xl md:text-5xl font-medium flex flex-col items-center justify-items">
                        <div>
                        <span className="font-bold">Only </span> 
                        $11.99/mo
                        </div>
                        <button
                            onClick={()=>{}}
                            className="w-[70%] md:w-[55%] mt-4 bg-aceflow-blue font-bold 
                            text-xl
                            md:text-4xl 
                            text-white px-1 py-3 md:py-6 rounded-xl hover:bg-blue-600"
                        >
                        Go Unlimited
                    </button>
                    </div>
                    <div className="font-light text-xs md:text-md mb-10">
                        Backed With Learning Science | Cancel Anytime | 24/7 Customer Support
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

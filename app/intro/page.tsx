'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Navbar from '../components/Navbar';

export default function Home() {

const router = useRouter();

return (
    <div>
        <Navbar/>
    <div className="grid h-fit items-center justify-center gap-8 px-6 pb-20 pt-10 md:mx-32 md:pt-16">

        <div className="space-y-2 text-center">
            <div className='text-xs font-light lg:text-lg'>PRACTICE QUESTIONS</div>
            <div className="mb-6 text-xl font-bold md:text-4xl lg:text-6xl">
                <span className="text-black">Master Anything With </span> <br/>
                <span className="text-aceflow-blue">Unlimited Practice </span>
                <span className="text-black">Questions</span>
            </div>    
        </div>   
      
        <div className="flex flex-col items-center py-4 md:py-8">
            <Image src={"/a+.svg"} height={100} width={100} alt="" className="h-40 w-40 md:w-60 lg:h-72 lg:w-72"/>
        </div>


        <div className="space-y-5 text-center">
            <div className="text-sm font-semibold md:text-xl lg:px-[20%]">
            Create infinite practice questions from your own study material to ace your quizzes, tests, and exams.
            </div>

            <button className="rounded-xl bg-aceflow-blue px-5 py-3 text-xl font-bold text-white hover:bg-blue-600 md:w-[60%] md:text-3xl lg:w-[40%]"
             onClick={()=>{router.push(`/login`)}}
            >
                Start Learning
            </button>
        </div>
    </div>
    </div>
  )
}

'use client';
import { useRouter } from "next/navigation";
import BigButton from "../components/Button";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {

const router = useRouter();

return (
    <div>
        <Navbar/>
    <div className="px-6 md:mx-32 pt-52 md:pt-36 grid items-center justify-center gap-8 h-fit">

        <div className="text-center space-y-2">
            <div className='font-light text-xs md:text-md lg:text-lg'>PRACTICE QUESTIONS</div>
            <div className="text-xl md:text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-black">Master Anything With </span> <br/>
                <span className="text-aceflow-blue">Unlimited Practice </span>
                <span className="text-black">Questions</span>
              </div>    
        </div>   
        
      
        <div className="flex flex-col justify-items items-center py-4 md:py-8">
            <Image src={"/a+.svg"} height={100} width={100} alt="" className="w-40 h-40 md:w-60 md:w-60 lg:w-72 lg:h-72"/>
        </div>


        <div className="text-center space-y-5">
            <div className="font-semibold text-sm md:text-xl lg:px-[20%]">
            Create infinite practice questions from your own study material to ace your quizzes, tests, and exams.
            </div>

            <button className="md:w-[60%] lg:w-[40%] bg-aceflow-blue font-bold text-xl md:text-3xl text-white px-5 py-3 rounded-xl hover:bg-blue-600"
             onClick={()=>{router.push(`/login`)}}
            >
                Start Learning
            </button>
        </div>
    </div>
    </div>
  )
}

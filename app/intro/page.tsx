'use client';
import { useRouter } from "next/navigation";
import BigButton from "../components/Button";
import Image from "next/image";

export default function Home() {

const router = useRouter();

return (
    <div className="mx-20 md:mx-40 pt-24 grid items-center justify-center gap-8 h-fit">

        <div className="text-center space-y-2">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
                Your new future starts now.
            </h1>
        </div>   
        
        <Image src={"/intro.png"} height={3412/4} width={2376/4} alt=""/>

        <div className="text-center space-y-3">
            <BigButton
            label="Become #1"
            onClick={()=>{router.push(`/login`)}}
            classNamePassedDown={"w-[60%] h-15 md:h-20 text-2xl md:text-4xl lg:text-5xl "}
            />
        </div>
    </div>
  )
}

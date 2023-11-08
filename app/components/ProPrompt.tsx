// ProPrompt.tsx
import { useRouter } from 'next/navigation';
import React from 'react';

interface ProPromptProps {
    setProPrompt: any  }

const ProPrompt: React.FC<ProPromptProps> = ({setProPrompt}) => {
  const router = useRouter();

  return (
    <div className='fixed left-1/2 top-1/2 z-50 w-[23.5rem] -translate-x-1/2 -translate-y-1/2 md:w-[29.5rem]'>
      <div className='relative mx-8 rounded-3xl bg-white px-8 py-10 outline outline-aceflow-blue md:mx-0 md:px-16'> {/* Adjusted px-8 for a narrower width */}
        <div className='mb-6 text-xl font-bold md:text-4xl'>
          <span className='text-black'>Feature only for </span>
          <br />
          <span className='text-aceflow-blue'>Aceflow Pro+ </span>
          <span className='text-black'>users</span>
        </div>

        <div>
          Become the #1 student you know you can be. Aceflow Pro+ gives you unlimited access to 21st-century AI-powered learning tools, driving unlimited growth for you.
        </div>
        <button onClick={()=>{router.push(`/pro`)}} className='mt-6 w-[40%] rounded-xl bg-aceflow-blue p-3 text-sm font-medium text-white hover:bg-blue-600 md:px-5 md:text-lg'>
          Get Pro+
        </button>
        <br/>
        <button className='mt-2 text-sm underline md:text-base' 
        onClick={()=>{setProPrompt(false)}}>I don't want unlimited learning</button>
      </div>
    </div>
  );
};

export default ProPrompt;

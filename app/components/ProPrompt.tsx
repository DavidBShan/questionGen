// ProPrompt.tsx
import React from 'react';

interface ProPromptProps {
    setProPrompt: any  }

const ProPrompt: React.FC<ProPromptProps> = ({setProPrompt}) => {
  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[23.5rem] md:w-[29.5rem] '>
      <div className='relative bg-white rounded-3xl outline outline-aceflow-blue py-10 px-8 md:px-16 mx-8 md:mx-0'> {/* Adjusted px-8 for a narrower width */}
        <div className='text-xl md:text-4xl font-bold mb-6'>
          <span className='text-black'>Feature only for </span>
          <br />
          <span className='text-aceflow-blue'>Aceflow Pro+ </span>
          <span className='text-black'>users</span>
        </div>

        <div>
          Become the #1 student you know you can be. Aceflow Pro+ gives you unlimited access to 21st-century AI-powered learning tools, driving unlimited growth for you.
        </div>
        <button className='w-[40%] bg-aceflow-blue font-medium text-sm md:text-lg text-white px-3 md:px-5 py-3 rounded-xl hover:bg-blue-600 mt-6'>
          Get Pro+
        </button>
        <br/>
        <button className='mt-2 underline text-sm md:text-md' 
        onClick={()=>{setProPrompt(false)}}>I don't want unlimited learning</button>
      </div>
    </div>
  );
};

export default ProPrompt;

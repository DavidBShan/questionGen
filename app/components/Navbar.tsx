import React from 'react';
import UserMenu from './authentification/UserMenu';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-white">
        <nav className="flex items-center justify-between border-y-4 border-blue-200 p-6 md:px-16">
        {/* <div className='absolute opacity-0 md:relative md:opacity-100'>
            <span className="text-sm md:text-lg">Practice Questions</span>
        </div> */}

        <div>
        <button onClick={()=>{router.push(`/pro`)}} 
            className="w-full rounded-xl bg-aceflow-blue p-3 text-sm font-medium text-white hover:bg-blue-600 md:px-5 md:text-lg">
            Try Aceflow Pro+
        </button>

        </div>
       
        <div className="text-2xl font-black md:text-4xl">
            <span>Aceflow</span>
        </div>

        <div className='flex flex-row gap-2 md:flex-col'>
            <UserMenu/>
        </div>

        

        </nav>
    </div>
  );
};

export default Navbar;

// import React from 'react';

// const Navbar = () => {
//   return (
//     <div className="fixed w-full bg-white">
//         <nav className="flex items-center justify-between border-y-4 border-blue-200 p-6 md:px-24">
//         <div className='absolute opacity-0 md:relative md:opacity-100'>
//             <span className="text-sm md:text-lg">Practice Questions</span>
//         </div>

//         <div className="text-2xl font-black md:text-4xl">
//             <span>Aceflow</span>
//         </div>
//         </nav>
//     </div>
//   );
// };

// export default Navbar;

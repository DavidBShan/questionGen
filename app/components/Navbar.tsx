import React, { useEffect, useState } from 'react';
import UserMenu from './authentification/UserMenu';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getMembershipType } from '@/util/users';

const Navbar = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [membershipType, setMembershipType] = useState("");

  let iterations = 0;

  useEffect(() => {
    while(session?.user === undefined && iterations < 10) {
      new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      iterations++;
    }

    if (session?.user !== undefined) {

      getMembershipType(session?.user, setMembershipType);
    }

  }, [membershipType, session, iterations]);

  return (
    <div className="w-full bg-white">
        <nav className="flex items-center justify-around border-y-4 border-blue-200 py-6">
        
        {(membershipType === "pro") ? <div className='absolute opacity-0 md:relative md:opacity-100 w-60'>
            <button className="text-sm md:text-lg" onClick={()=>{router.push(`/pdfUpload`)}} >Practice Questions</button>
        </div>:<div>
        <button onClick={()=>{router.push(`/pro`)}} 
            className="w-full rounded-xl bg-aceflow-blue p-3 text-sm font-medium text-white hover:bg-blue-600 md:px-5 md:text-lg">
            Try Aceflow Pro+
        </button>

        </div>}
       
        <div className="text-2xl font-black md:text-4xl">
            <span>Aceflow</span>
        </div>

        <div className='md:w-60 flex flex-col items-center'> <UserMenu/></div>
       

        </nav>
    </div>
  );
};

export default Navbar;

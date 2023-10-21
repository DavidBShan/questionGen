'use client';

import { AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const UserMenu = () => {
    const router = useRouter();
    const[isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value)=>!value);
    }, [])

    const session = useSession({
        required: true,
        onUnauthenticated() {
          // redirect('/login');
        },
      });
    
      const currentUser = session?.data?.user;
    

    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={toggleOpen}
                    className="
                    flex
                    cursor-pointer
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    border-[1px]
                    border-neutral-200
                    p-4
                    transition
                    hover:shadow-md
                    md:px-2
                    md:py-1
                    "
                >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                  <div
                  className="
                    absolute
                    right-0
                    top-12
                    w-[40vw]
                    overflow-hidden
                    rounded-xl
                    bg-white
                    text-sm
                    shadow-md
                    md:w-3/4
                  "
                  >
                    <div
                    className="flex cursor-pointer flex-col"
                    >
                       {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={() => signOut()}
                                label="Logout"
                            />
                        </>
                       ) : ( 
                        <>
                            <MenuItem 
                                onClick={()=>{router.push(`/login`)}}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={()=>{router.push(`/login`)}}
                                label="Sign up"
                            />
                        </>
                       )}
                    </div>    
                  </div>  
            )}
        </div>
     );
}
 
export default UserMenu;
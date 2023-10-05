'use client';

import { FcGoogle } from 'react-icons/fc';
import { Form } from "react-bootstrap";

import CustomButton from "../Button";
import { useEffect, useState } from 'react';

interface SignUpProps {
  email: string;
  password: string;
  setEmail: (e: any) => void;
  setPassword: (e: any) => void;
  setDisplayName: (e: any) => void;

  handleSignIn: () => void;
  signUp: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ 
    email,
    password,
    
    setEmail,
    setPassword,
    setDisplayName,

    handleSignIn,
    signUp
}) => {

  const [passwordAgain, setPasswordAgain] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const concatenateNames = () => {
    return `${firstName} ${lastName}`;
  };

  useEffect(() => {
    const newDisplayName = concatenateNames();
    setDisplayName(newDisplayName);
  }, [firstName, lastName, setDisplayName]);

  return ( 
    <div className="grid space-y-4 px-60 w-full">
        <div className="grid content-start justify-center">
        <button
            className="font-bold text-md md:text-xl gap-4 hover:bg-gray-100
                        flex items-center rounded-lg py-2 pl-3 md:pl-8 border-4 w-60 h-15 md:w-80 md:h-20"
            onClick={handleSignIn}
            >
            <FcGoogle size={30} /> Sign up with Google
            </button>
        </div>

        <div className="sm:text-xl md:text-2xl lg:text-3xl text-gray-400 grid content-start text-center">- OR -</div>

        <Form className="grid gap-4">
            {/* <input
            id="firstName"
            name="firstName"
            type="firstName"
            autoComplete="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
            className="text-md md:text-lg md:text-2xl border-b-4 py-2 max-h-14 font-bold placeholder-gray-500 outline-0 rounded-none"
            />
            <input
            id="lastName"
            name="lastName"
            type="lastName"
            autoComplete="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
            className="text-md md:text-lg md:text-2xl border-b-4 py-2 max-h-14 font-bold placeholder-gray-500 outline-0 rounded-none"
            /> */}
            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="text-md md:text-lg md:text-2xl border-b-4 py-2 max-h-14 font-bold placeholder-gray-500 outline-0 rounded-none"
            />
            <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create Password"
            className="text-md md:text-lg md:text-2xl border-b-4 py-2 max-h-14 font-bold placeholder-gray-500 outline-0 rounded-none"
            />
            <input
            id="passwordAgain"
            name="passwordAgain"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPasswordAgain(e.target.value)}
            required
            placeholder="Confirm Password"
            className="text-md md:text-lg md:text-2xl border-b-4 py-2 max-h-14 font-bold placeholder-gray-500 outline-0 rounded-none"
            />
        </Form>

        <CustomButton
            label="I'm Ready"
            disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
            onClick={() => signUp()}
            customBG
            classNamePassedDown=" px-20 text-xl md:text-3xl"
        />
    </div>

   );
}
 
export default SignUp;
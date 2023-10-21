'use client';

import { auth } from '../../firebase/config';
import { sendPasswordResetEmail } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import { Form } from "react-bootstrap";

import CustomButton from "../Button";
import { useEffect, useState } from 'react';

const SignIn = () => {

    const [email, setEmail] = useState('');

    const resetEmail = () => {
      sendPasswordResetEmail(auth, email);
    };

  return ( 
    <div className="grid w-full space-y-4 px-60">

        <Form className="grid gap-4">
            
            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="max-h-14 rounded-none border-b-4 py-2 font-bold outline-0 placeholder:text-gray-500 md:text-lg xl:text-2xl"
            />
            
        </Form>

        <CustomButton
            label="Send Forgot Password Email"
            disabled={!email}
            onClick={() => resetEmail()}
            customBG
            classNamePassedDown=" px-20 text-xl md:text-2xl"
        />
    </div>

   );
}
 
export default SignIn;
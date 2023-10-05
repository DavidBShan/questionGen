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
    <div className="grid space-y-4 px-60 w-full">

        <Form className="grid gap-4">
            
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
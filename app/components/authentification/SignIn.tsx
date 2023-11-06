'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { Form } from "react-bootstrap";

import CustomButton from "../Button";
import { useEffect, useState } from 'react';

import { toast } from "react-hot-toast";

import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from 'next/navigation';

interface SignInProps {
  email: string;
  password: string;
  setEmail: (e: any) => void;
  setPassword: (e: any) => void;
  setDisplayName: (e: any) => void;

  handleSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ 
    email,
    password,
    
    setEmail,
    setPassword,
    setDisplayName,

    handleSignIn,
}) => {

  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const concatenateNames = () => {
    return `${firstName} ${lastName}`;
  };

  useEffect(() => {
    const newDisplayName = concatenateNames();
    setDisplayName(newDisplayName);
  }, [firstName, lastName, setDisplayName]);
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn('credentials', {email, password, redirect: false , callbackUrl: '/pdfUpload'})
    .then((callback) => {
      if (callback?.ok) {
        toast.success('Logged in');
        router.push(`/pdfUpload`);
      }
      
      if (callback?.error) {
        
        if (callback?.error === "CredentialsSignin") {
          toast.error("Email or password are incorrect.");
        } else {
          toast.error(callback.error);
        }
      }
    });
  }

  return ( 
    <div className="grid w-full space-y-4 md:px-20">
        <div className="grid content-start justify-center">
            <button
            className="flex w-60 items-center gap-4
                        rounded-lg border-4 py-2 pl-4 text-base font-bold hover:bg-gray-100 md:h-20 md:w-80 md:pl-10 md:text-xl"
            onClick={handleSignIn}
            >
            <FcGoogle size={30} /> Login with Google
            </button>
        </div>

        <div className="grid content-start text-center text-gray-400 sm:text-xl md:text-2xl lg:text-3xl">- OR -</div>

        <Form className="grid gap-4">
            
            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="max-h-14 rounded-none border-b-4 py-2 text-base font-bold outline-0 placeholder:text-gray-500 md:text-lg lg:text-2xl"
            />
            <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
            className="max-h-14 rounded-none border-b-4 py-2 text-base font-bold outline-0 placeholder:text-gray-500 md:text-lg lg:text-2xl"
            />
            
        </Form>

        <CustomButton
            label="Login"
            disabled={!email || !password}
            onClick={onSubmit}
            customBG
            classNamePassedDown=" px-20 text-xl md:text-3xl"
        />
    </div>

   );
}
 
export default SignIn;
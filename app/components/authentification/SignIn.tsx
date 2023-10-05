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

  // () => signIn('credentials', {email, password, redirect: false, callbackUrl: '/corrector'})

  const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    // setIsLoading(true);

    signIn('credentials', {email, password, redirect: false , callbackUrl: '/corrector'})
    .then((callback) => {
      // setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.push(`/corrector`)
        // loginModal.onClose();
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
    <div className="grid space-y-4 px-60 w-full">
        <div className="grid content-start justify-center">
            <button
            className="font-bold text-md md:text-xl gap-4 hover:bg-gray-100
                        flex items-center rounded-lg py-2 pl-4 md:pl-10 border-4 w-60 h-15 md:w-80 md:h-20"
            onClick={handleSignIn}
            >
            <FcGoogle size={30} /> Login with Google
            </button>
        </div>

        <div className="sm:text-xl md:text-2xl lg:text-3xl text-gray-400 grid content-start text-center">- OR -</div>

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
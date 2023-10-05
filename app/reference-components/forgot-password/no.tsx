// 'use client';

// import { auth } from '../firebase/config';
// import { sendPasswordResetEmail } from "firebase/auth";
// import { FcGoogle } from 'react-icons/fc';
// import { Form } from "react-bootstrap";

// import CustomButton from "@/app/components/Button";
// import { useEffect, useState } from 'react';

// import { toast } from "react-hot-toast";

// import { 
//   FieldValues, 
//   SubmitHandler, 
//   useForm
// } from "react-hook-form";

// const SignIn = () => {

//     const [email, setEmail] = useState('');

//     const resetEmail = () => {
//       sendPasswordResetEmail(auth, email);
//     };

//   return ( 
//     <div className="grid space-y-4 px-60 w-full">

//         <div className="sm:text-xl md:text-2xl lg:text-3xl text-gray-400 grid content-start text-center">- OR -</div>

//         <Form className="grid gap-4">
            
//             <input
//             id="email"
//             name="email"
//             type="email"
//             autoComplete="email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Email Address"
//             className="text-md md:text-lg md:text-2xl border-b-4 py-2 max-h-14 font-bold placeholder-gray-500 outline-0 rounded-none"
//             />
            
//         </Form>

//         <CustomButton
//             label="Send Forgot Password Email"
//             disabled={!email}
//             onClick={() => resetEmail()}
//             customBG
//             classNamePassedDown=" px-20 text-xl md:text-3xl"
//         />
//     </div>

//    );
// }
 
// export default SignIn;

// // 'use client';
// // import { useState } from 'react';
// // import { auth } from '../firebase/config';
// // import { sendPasswordResetEmail } from "firebase/auth";

// // export default function ForgotPassword() {
// //   const [email, setEmail] = useState('');

// //   const resetEmail = () => {
// //     sendPasswordResetEmail(auth, email);
// //   };

// //   return (
// //     <>
// //     <div className="flex bg-black min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
// //         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
// //           <img
// //             className="mx-auto h-10 w-auto"
// //             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
// //             alt="Your Company"
// //           />
// //           <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
// //             Forgot Password
// //           </h2>
// //         </div>

// //         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
// //           <div className="space-y-6">
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
// //                 Email address
// //               </label>
// //               <div className="mt-2">
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   autoComplete="email"
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <button
// //                 onClick={() => resetEmail()}
// //                 disabled={!email}
// //                 className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
// //               >
// //                 Send Forgot Password Email
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   )
// // }
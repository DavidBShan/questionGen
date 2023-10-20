'use client';
import Intro from './intro/page'

import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  
  const session = useSession({
    required: true,
    onUnauthenticated() {
      // redirect('/login');
    },
  });

  return (
      <Intro/>
  )
}

Home.requireAuth = true
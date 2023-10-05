import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import SessionProvider from './providers/SessionProvider';
import ToasterProvider from './providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Feedack',
  description: 'Gives you feedback on your writing!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToasterProvider />
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
      </body>
    </html>
  )
}
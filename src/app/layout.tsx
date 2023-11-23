// import './globals.css'
import NextAuthClientSessionProvider from '@/components/NextAuthClientSessionProvider';
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Technical Testing Pilarmedia | Ariel Christian',
  description: 'Website for technical testing at Pilarmedia by Ariel Christian',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  // console.info(session?.user)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/')
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="logo.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body>
        <NextAuthClientSessionProvider>
          {children}
        </NextAuthClientSessionProvider>
      </body>
    </html>
  )
}

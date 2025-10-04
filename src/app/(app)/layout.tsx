import React from 'react';
import NavWrapper from '@/app/components/nav/nav-wrapper';
import { DM_Serif_Display } from 'next/font/google';
const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
});

const mainFont = dmSerifDisplay;

import '@/app/styles/globals.scss';

import HeaderInfo from '../components/header/info';
import Footer from '../components/footer/footer';
import { AuthProvider } from '../providers/auth';
import { getUser } from '../providers/getUser';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const user = await getUser()

  return (
    <html lang='en'>
      <body className={mainFont.className}>
        <AuthProvider initialUser={user}>
          <HeaderInfo />
          <NavWrapper />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

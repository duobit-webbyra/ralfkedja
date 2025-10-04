import React from 'react';

import { DM_Serif_Display } from 'next/font/google';
const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
});

const mainFont = dmSerifDisplay;

import '@/app/styles/globals.scss';
import Nav from '../components/nav/nav';
import HeaderInfo from '../components/header/info';
import Footer from '../components/footer/footer';
import { AuthProvider } from '../providers/auth';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={mainFont.className}>
        <AuthProvider>
          <HeaderInfo />
          <Nav />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

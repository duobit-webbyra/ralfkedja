'use client';

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { verifyTurnstile } from '@/app/(app)/kontakt/actions';
import { Form, Input } from '@/app/components/Form';
import { Link } from '@/app/components/link/link';
import Container from '@/app/components/essentials/Container';
import SecondaryButton from '@/app/components/button/secondary-button';
import Turnstile from '@/app/components/turnstile';
import PrimaryButton from '@/app/components/button/primary-button';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Login API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log('Response status:', response.status);
        console.log('Error response from server:', responseData);

        // Extract the error message from the response
        const errorMessage = responseData.errors?.[0]?.message;

        // Handle specific error messages
        if (errorMessage?.includes('incorrect')) {
          setErrorMessage('Felaktig e-post eller lösenord.');
          return;
        }

        if (errorMessage?.includes('locked')) {
          setErrorMessage('För många misslyckade inloggningsförsök. Vänta och försök igen senare.');
          return;
        }

        // Default error message
        setErrorMessage('Ett fel uppstod. Försök igen senare.');
        return;
      }

      // Successful login
      if (responseData.message === 'Authentication Passed') {
        window.location.href = '/medlemssida';
      } else {
        setErrorMessage('Ett fel uppstod. Försök igen senare.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setErrorMessage('Ett fel uppstod. Försök igen senare.');
    }
  };

  return (
    <section className='relative flex min-h-[calc(100vh-var(--nav-height)-var(--info-header-height))] items-center justify-center'>
      {/* Background Image */}
      <Image
        src='/nature3.webp'
        alt='Background'
        layout='fill'
        quality={100}
        className='-z-10 object-cover' // Ensure the image is behind all other elements
      />

      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black opacity-85 -z-10'></div>

      {/* Content */}
      <Container className='relative flex flex-col gap-12  text-white items-center justify-center'>
        <div className='bg-black/50 px-12 pt-8 w-full rounded-3xl max-w-[600px] shadow-lg flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-white! text-center sm:whitespace-nowrap  text-3xl! md:text-4xl!'>
              Logga in till medlemssidan
            </h1>
            <span className='text-white! text-center'>
              Logga in för att få tillgång till exklusivt extramaterial. Är du inte medlem ännu men
              intresserad?{' '}
              <Link href='/kontakt' className='!underline'>
                Kontakta mig
              </Link>{' '}
              för mer information!
            </span>
          </div>
          <Form
            className='flex flex-col gap-8 w-full'
            onSubmit={handleSubmit}
            action={verifyTurnstile}
          >
            <div className='flex flex-col gap-4 w-full'>
              <Input className='bg-white' placeholder='E-post' name='email' type='email' required />
              <Input
                className='bg-white'
                placeholder='Lösenord'
                name='password'
                type='password'
                required
              />
            </div>

            {errorMessage && <p className='text-red-400! '>{errorMessage}</p>}
            <div className='w-full flex justify-center'>
              <div className='w-max'>
                <SecondaryButton type='submit'>Logga in</SecondaryButton>
              </div>
            </div>
            <Turnstile />
          </Form>
        </div>
      </Container>
    </section>
  );
}

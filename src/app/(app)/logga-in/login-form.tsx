'use client';

import React from 'react';
import Image from 'next/image';
import PrimaryButton from '@/app/components/button/primary-button';
import { Form, Input } from '@/app/components/Form';
import { Link } from '@/app/components/link/link';
import Container from '@/app/components/essentials/Container';
import SecondaryButton from '@/app/components/button/secondary-button';

export default function LoginForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Redirect to a new page to trigger a server-side re-render
      window.location.href = '/medlemssida';
    } catch (error) {
      console.error('Login failed:', error);
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
      <Container className='relative flex flex-col gap-12 max-w-[600] text-white'>
        <div className=''>
          <h1 className='text-white!'>Logga in till medlemssidan</h1>
          <span className='text-white!'>
            Logga in för att få tillgång till exklusivt extramaterial. Är du inte medlem ännu men
            intresserad?{' '}
            <Link href='/kontakt' className='!underline'>
              Kontakta mig
            </Link>{' '}
            för mer information!
          </span>
        </div>
        <Form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 w-full'>
            <Input placeholder='E-post' name='email' type='email' required />
            <Input placeholder='Lösenord' name='password' type='password' required />
          </div>
          <div className='w-full flex justify-center'>
            <div className='w-max'>
              <SecondaryButton type='submit'>Logga in</SecondaryButton>
            </div>
          </div>
        </Form>
      </Container>
    </section>
  );
}

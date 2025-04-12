'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/auth';
import PrimaryButton from '@/app/components/button/primary-button';
import { Form, Input } from '@/app/components/Form';
import { Link } from '@/app/components/link/link';
import Container from '@/app/components/essentials/Container';
export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      await login({ email, password });
      router.push('/medlemssida'); // Redirect to medlemssida after successful login
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally, handle login failure (e.g., show an error message)
    }
  }

  return (
    <section className='flex min-h-[calc(100vh-var(--nav-height)-var(--info-header-height))] items-center justify-center !bg-tertiary-100'>
      <Container className='flex flex-col gap-12 max-w-[600]'>
        <div className=''>
          <h1 className=''>Logga in till medlemssidan</h1>
          <span>
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
          <div className='w-max flex justify-end'>
            <PrimaryButton type='submit'>Logga in</PrimaryButton>
          </div>
        </Form>
      </Container>
    </section>
  );
}

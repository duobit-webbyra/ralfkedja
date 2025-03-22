'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/auth';
import style from '@/app/components/contact/contact-form.module.scss';
import PrimaryButton from '@/app/components/button/primary-button';
import { Input } from '@/app/components/Form';
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
    <section
      className='flex min-h-[calc(100vh-var(--nav-height)-var(--info-header-height))] items-center justify-center'
      style={{ backgroundColor: 'var(--primary-300)' }}
    >
      <Container className='flex flex-col gap-12 max-w-[500]'>
        <div className=''>
          <h1 className='text-[var(--tertiary-100)]'>Logga in till medlemssidan</h1>
          <span>
            Logga in för att få tillgång till exklusivt extramaterial. Är du inte medlem ännu men
            intresserad?{' '}
            <Link href='/kontakt' className='underline'>
              Kontakta mig
            </Link>{' '}
            för mer information!
          </span>
        </div>
        <form className='flex flex-col gap-8 w-full ' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 w-full'>
            <input
              className={style.forminput}
              placeholder='E-post'
              name='email'
              type='email'
              required
            />
            <input
              className={style.forminput}
              placeholder='Lösenord'
              name='password'
              type='password'
              required
            />
          </div>
          <div className='w-max flex justify-end'>
            <PrimaryButton type='submit'>Logga in</PrimaryButton>
          </div>
        </form>
      </Container>
    </section>
  );
}

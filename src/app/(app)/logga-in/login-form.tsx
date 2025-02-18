'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/auth';
import style from '@/app/components/contact/contact-form.module.scss';
import PrimaryButton from '@/app/components/button/primary-button';

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
    <section style={{ paddingBlock: '4rem', backgroundColor: 'var(--primary-300)' }}>
      <form onSubmit={handleSubmit}>
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
        <PrimaryButton type='submit'>Logga in</PrimaryButton>
      </form>
    </section>
  );
}

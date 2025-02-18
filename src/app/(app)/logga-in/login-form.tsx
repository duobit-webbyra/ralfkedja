'use client';

import React from 'react';
import { useAuth } from '@/app/providers/auth';
import style from '@/app/components/contact/contact-form.module.scss';
import PrimaryButton from '@/app/components/button/primary-button';

export default function LoginForm() {
  const { login } = useAuth();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    login({ email, password });
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

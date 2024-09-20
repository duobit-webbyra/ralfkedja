'use client';
import React, { useState } from 'react';

import style from '../contact/contact-form.module.scss';
import PrimaryButton from '../button/primary-button';

interface CourseFormProps {
  layout: 'grid' | 'flex';
}

import { sendCourseInquiry } from '@/app/(app)/kontakt/actions';
import { useFormStatus } from 'react-dom';

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton type='submit' disabled={pending}>
      {!pending ? 'Skicka' : 'Skickar...'}
    </PrimaryButton>
  );
};

export default function CourseForm({ layout }: CourseFormProps) {
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const isChecked = Array.from(checkboxes).some(
      (checkbox) => (checkbox as HTMLInputElement).checked,
    );

    if (!isChecked) {
      event.preventDefault();
      setError('Välj minst ett alternativ.');
    } else {
      setError('');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h2 style={{ textAlign: 'center', color: 'var(--tertiary-100)' }}>Intresseanmälan</h2>
        <form className={style.form} action={sendCourseInquiry} onSubmit={handleSubmit}>
          <div className={`${style.inputs} ${layout === 'grid' ? style.grid : style.flex}`}>
            <input
              className={style.forminput}
              type='text'
              placeholder='Namn'
              minLength={2}
              maxLength={150}
              required
              name='name'
            />
            <input
              className={style.forminput}
              type='email'
              placeholder='E-mail'
              minLength={5}
              maxLength={150}
              required
              name='email'
            />
            <input
              className={style.forminput}
              type='number'
              placeholder='Telefonnummer'
              minLength={2}
              maxLength={150}
              required
              name='phone'
            />
            <div className={style['checkbox-group']}>
              <label>
                <input type='checkbox' name='options' value='Biomagnetism steg 1-2' />
                Biomagnetism steg 1-2
              </label>
              <label>
                <input type='checkbox' name='options' value='Touch for Health steg 1-4' />
                Touch for Health steg 1-4
              </label>
              <label>
                <input
                  type='checkbox'
                  name='options'
                  value='Grundkurs i kinesiologi/muskeltestning'
                />
                Grundkurs i kinesiologi/muskeltestning
              </label>
            </div>
          </div>
          {error && <p style={{ color: 'var(--secondary-200)' }}>{error}</p>}
          <Submit />
        </form>
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import style from '../contact/contact-form.module.scss';
import PrimaryButton from '../button/primary-button';
import { Input } from '../Form';

import { sendCourseInquiry } from '@/app/(app)/kontakt/actions';
import { useFormStatus } from 'react-dom';
import Turnstile from '../turnstile';

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton type='submit' disabled={pending}>
      {!pending ? 'Skicka' : 'Skickar...'}
    </PrimaryButton>
  );
};

export default function CourseForm() {
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
      <div className='flex flex-col gap-8'>
        <h2 className='md:text-center'>Intresseanmälan</h2>
        <form className={style.form} action={sendCourseInquiry} onSubmit={handleSubmit}>
          <div className={`flex flex-col gap-4 ${style['inputs']}`}>
            <Input
              className='bg-tertiary-200'
              type='text'
              placeholder='Namn'
              minLength={2}
              maxLength={150}
              required
              name='name'
            />
            <Input
              className='bg-tertiary-200'
              type='email'
              placeholder='E-mail'
              minLength={5}
              maxLength={150}
              required
              name='email'
            />
            <Input
              className='bg-tertiary-200'
              type='number'
              placeholder='Telefonnummer'
              minLength={2}
              maxLength={150}
              required
              name='phone'
            />
            <p className='text-xl!'>Markera de kurser du är intresserad av nedan:</p>
            <div className={style['checkbox-group']}>
              <div>
                <input type='checkbox' name='options' value='Biomagnetism steg 1-2' />
                <label>Biomagnetism steg 1-2</label>
              </div>
              <div>
                <input type='checkbox' name='options' value='Touch for Health steg 1-4' />
                <label>Touch for Health steg 1-4</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='options'
                  value='Grundkurs i kinesiologi/muskeltestning'
                />
                Grundkurs i kinesiologi/muskeltestning
              </div>
              <p className='text-xl!'>Vilken stad skulle du föredra att gå kursen i?</p>
            </div>
            <div className={style['radio-group']}>
              <div className={style['input-selection']}>
                <input
                  type='radio'
                  id='eskilstuna'
                  name='preferred_location'
                  value='Eskilstuna'
                  defaultChecked
                />
                <label>Eskilstuna</label>
              </div>
              <div className={style['input-selection']}>
                <input type='radio' id='stockholm' name='preferred_location' value='Stockholm' />
                <label>Stockholm</label>
              </div>
            </div>
            <p className='text-xl!'>Övriga frågor och funderingar:</p>
            <textarea
              className={style.textarea}
              placeholder='Meddelande'
              maxLength={500}
              name='message'
            ></textarea>
          </div>
          {error && <p style={{ color: 'var(--secondary-200)' }}>{error}</p>}
          <Submit />
          <Turnstile />
        </form>
      </div>
    </div>
  );
}

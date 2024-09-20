'use client';
import React from 'react';

import style from '../contact/contact-form.module.scss';
import PrimaryButton from '../button/primary-button';

interface CourseFormProps {
  layout: 'grid' | 'flex';
}

import { sendEmail } from '@/app/(app)/kontakt/actions';
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
  return (
    <div className={style.container}>
      <div className={style.content}>
        <form className={style.form} action={sendEmail}>
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
            <p>ds</p>
            <div className={style.checkboxGroup}>
              <label>
                <input type='checkbox' name='options' value='option1' />
                Alternativ 1
              </label>
              <label>
                <input type='checkbox' name='options' value='option2' />
                Alternativ 2
              </label>
              <label>
                <input type='checkbox' name='options' value='option3' />
                Alternativ 3
              </label>
            </div>
          </div>
          <Submit />
        </form>
      </div>
    </div>
  );
}

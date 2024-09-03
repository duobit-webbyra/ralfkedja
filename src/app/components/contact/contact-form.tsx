'use client';
import React, { useState } from 'react';

import style from './contact-form.module.scss';

interface ContactFormProps {
  layout: 'grid' | 'flex';
}

export default function ContactForm({ layout }: ContactFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    const data = {
      name: String(event.target.name.value),
      email: String(event.target.email.value),
      message: String(event.target.message.value),
      phone: String(event.target.phone.value),
      subject: String(event.target.subject.value),
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Message sent successfully');
      setLoading(false);
      event.target.name.value = '';
      event.target.email.value = '';
      event.target.phone.value = '';
      event.target.subject.value = '';
      event.target.message.value = '';
    }
    if (!response.ok) {
      console.log('Error sending message');
      setLoading(false);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form className={style.form} onSubmit={handleSubmit}>
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

            <input
              className={style.forminput}
              type='text'
              placeholder='Ämne'
              minLength={5}
              maxLength={150}
              required
              name='subject'
            />
          </div>
          <textarea
            placeholder='Meddelande'
            minLength={10}
            maxLength={500}
            name='message'
            required
          ></textarea>
          <button type='submit' disabled={loading}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

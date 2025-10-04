'use client'

import React from 'react'

import style from './contact-form.module.scss'
import PrimaryButton from '../button/primary-button'

interface ContactFormProps {
  layout: 'grid' | 'flex'
}

import sendEmail from '@/app/(app)/kontakt/actions'
import { useFormState, useFormStatus } from 'react-dom'
import Turnstile from '@/app/components/turnstile'

const Submit = () => {
  const { pending } = useFormStatus()
  return (
    <PrimaryButton type="submit" disabled={pending}>
      {!pending ? 'Skicka' : 'Skickar...'}
    </PrimaryButton>
  )
}

export default function ContactForm({ layout }: ContactFormProps) {
  const [state, formAction] = useFormState(sendEmail, null)
  return (
    <div className={style.container}>
      <div className={style.content}>
        <form className={style.form} action={formAction}>
          <div className={`${style.inputs} ${layout === 'grid' ? style.grid : style.flex}`}>
            <input
              className={style.forminput}
              type="text"
              placeholder="Namn"
              minLength={2}
              maxLength={150}
              required
              name="name"
            />
            <input
              className={style.forminput}
              type="email"
              placeholder="E-mail"
              minLength={5}
              maxLength={150}
              required
              name="email"
            />
            <input
              className={style.forminput}
              type="number"
              placeholder="Telefonnummer"
              minLength={2}
              maxLength={150}
              required
              name="phone"
            />

            <input
              className={style.forminput}
              type="text"
              placeholder="Ämne"
              minLength={5}
              maxLength={150}
              required
              name="subject"
            />
          </div>
          <textarea
            placeholder="Meddelande"
            minLength={10}
            maxLength={500}
            name="message"
            required
          ></textarea>
          <Submit />
          <Turnstile />
        </form>
      </div>
    </div>
  )
}

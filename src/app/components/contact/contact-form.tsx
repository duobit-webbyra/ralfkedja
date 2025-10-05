'use client'

import React, { useActionState } from 'react'

import style from './contact-form.module.scss'
import PrimaryButton from '../button/primary-button'
import { Input } from '@/app/components/Form'
interface ContactFormProps {
  grid?: boolean
}

import { sendEmail } from '@/app/(app)/kontakt/actions'
import { useFormStatus } from 'react-dom'
import Turnstile from '@/app/components/turnstile'

const Submit = () => {
  const { pending } = useFormStatus()
  return (
    <PrimaryButton type="submit" disabled={pending}>
      {!pending ? 'Skicka' : 'Skickar...'}
    </PrimaryButton>
  )
}

export default function ContactForm({ grid }: ContactFormProps) {
  const [state, formAction] = useActionState(sendEmail, null)
  return (
    <form className={`flex flex-col gap-3`} action={formAction}>
      <div className={`flex ${grid ? 'grid grid-cols-2' : 'flex-col'} gap-3`}>
        <Input
          className={style.forminput}
          type="text"
          placeholder="Namn"
          minLength={2}
          maxLength={150}
          required
          name="name"
        />
        <Input
          className={style.forminput}
          type="email"
          placeholder="E-mail"
          minLength={5}
          maxLength={150}
          required
          name="email"
        />
        <Input
          className={style.forminput}
          type="tel"
          placeholder="Telefonnummer"
          minLength={2}
          maxLength={150}
          required
          name="phone"
        />
        <Input
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
        className={style.textarea}
        placeholder="Meddelande"
        minLength={10}
        maxLength={500}
        name="message"
        required
      ></textarea>
      <Submit />
      <Turnstile />
    </form>
  )
}

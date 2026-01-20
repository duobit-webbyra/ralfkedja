'use client'
import React, { useActionState, useState } from 'react'
import style from '../contact/contact-form.module.scss'
import PrimaryButton from '../button/primary-button'
import { Input, Form, TextArea } from '../Form'

import { sendCourseInquiry } from '@/app/(app)/kontakt/actions'
import { useFormStatus } from 'react-dom'
import TurnstileWidget from '../turnstile'

const Submit = () => {
  const { pending } = useFormStatus()
  return (
    <PrimaryButton type="submit" disabled={pending}>
      {!pending ? 'Skicka' : 'Skickar...'}
    </PrimaryButton>
  )
}

export default function CourseForm() {
  const [error, setError] = useState('')

  const [state, formAction] = useActionState(sendCourseInquiry, null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    const courseCheckboxes = form.querySelectorAll(
      'input[name="options"]',
    ) as NodeListOf<HTMLInputElement>

    const hasSelectedCourse = Array.from(courseCheckboxes).some((checkbox) => checkbox.checked)

    if (!hasSelectedCourse) {
      event.preventDefault()
      setError('Du måste välja minst en kurs.')
      return
    }

    setError('')
  }

  return (
    <div className={style.container}>
      <div className="flex flex-col gap-8">
        <h2 className="md:text-center">Intresseanmälan</h2>
        <Form className={style.form} action={formAction} onSubmit={handleSubmit}>
          <div className={`flex flex-col gap-4 ${style['inputs']}`}>
            <Input
              className="bg-tertiary-200"
              type="text"
              placeholder="Namn"
              minLength={2}
              maxLength={150}
              required
              name="name"
            />
            <Input
              className="bg-tertiary-200"
              type="email"
              placeholder="E-mail"
              minLength={5}
              maxLength={150}
              required
              name="email"
            />
            <Input
              className="bg-tertiary-200"
              type="number"
              placeholder="Telefonnummer"
              minLength={2}
              maxLength={150}
              required
              name="phone"
            />
            <p className="text-xl!">Markera de kurser du är intresserad av nedan:</p>
            <div className={style['checkbox-group']}>
              <div>
                <input type="checkbox" name="options" value="Biomagnetism steg 1-2" />
                <label>Biomagnetism steg 1-2</label>
              </div>
              <div>
                <input type="checkbox" name="options" value="Touch for Health steg 1-4" />
                <label>Touch for Health steg 1-4</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="options"
                  value="Grundkurs i kinesiologi/muskeltestning"
                />
                Grundkurs i kinesiologi/muskeltestning
              </div>
              <p className="text-xl!">Vilken stad skulle du föredra att gå kursen i?</p>
            </div>
            <div className={style['radio-group']}>
              <div className={style['input-selection']}>
                <input
                  type="radio"
                  id="eskilstuna"
                  name="preferred_location"
                  value="Eskilstuna"
                  defaultChecked
                />
                <label>Eskilstuna</label>
              </div>
              <div className={style['input-selection']}>
                <input type="radio" id="stockholm" name="preferred_location" value="Stockholm" />
                <label>Stockholm</label>
              </div>
            </div>
            <p className="text-xl!">Övriga frågor och funderingar:</p>
            <TextArea
              className={style.textarea}
              placeholder="Meddelande"
              maxLength={500}
              name="message"
            ></TextArea>
          </div>
          <div className={style['checkbox-group']}>
            <div className={style['input-selection']}>
              <input type="checkbox" name="email_consent" id="email_consent" required />
              <label htmlFor="email_consent">
                Jag samtycker till att få e-post med information och nyheter om de kurser jag
                anmäler intresse för. Jag kan när som helst avregistrera mig.
              </label>
            </div>
          </div>
          <TurnstileWidget />
          <Submit />
          {error && (
            <p role="alert" style={{ color: 'var(--secondary-200)' }}>
              {error}
            </p>
          )}{' '}
          {state?.message && (
            <p style={{ color: state?.status === 'success' ? 'green' : 'var(--secondary-200)' }}>
              {state.message}
            </p>
          )}
        </Form>
      </div>
    </div>
  )
}

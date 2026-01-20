'use client'
import React, { useTransition, useRef } from 'react'
import { addGeneralSubscriber } from './actions'
import PrimaryButton from '../button/primary-button'
import TurnstileWidget from '../turnstile'

export default function NewsLetterComponent() {
  const [pending, startTransition] = useTransition()
  const [message, setMessage] = React.useState('')
  const [messageType, setMessageType] = React.useState<'success' | 'error'>('success')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const turnstileToken = formData.get('cf-turnstile-response')

    if (!turnstileToken) {
      setMessage('Vänligen slutför säkerhetsverifieringen.')
      setMessageType('error')
      return
    }

    startTransition(async () => {
      const result = await addGeneralSubscriber(formData)
      setMessage(result?.message || '')
      setMessageType(result?.message?.includes('Error') ? 'error' : 'success')

      // Reset form on success
      if (!result?.message?.includes('Error')) {
        formRef.current?.reset()
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto text-center px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Prenumerera på Nyhetsbrevet
      </h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Håll dig uppdaterad med de senaste nyheterna och uppdateringar. Anmäl dig så får du utskick
        direkt till din mejl.
      </p>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Din e-postadress"
          className="w-full sm:w-80 px-4 py-3 rounded-lg border transition"
        />

        <TurnstileWidget />

        <div>
          <PrimaryButton type="submit" disabled={pending}>
            {pending ? 'Skickar...' : 'Prenumerera'}
          </PrimaryButton>
        </div>
      </form>

      {message && (
        <p
          className={`text-sm mt-3 ${messageType === 'error' ? 'text-red-700' : 'text-green-700'}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}

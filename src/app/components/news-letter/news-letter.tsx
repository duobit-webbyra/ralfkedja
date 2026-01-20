'use client'
import React from 'react'
import { useActionState } from 'react'
import { addGeneralSubscriber } from './actions'
import PrimaryButton from '../button/primary-button'
import TurnstileWidget from '../turnstile'

export default function NewsLetterComponent() {
  const [state, action, pending] = useActionState(addGeneralSubscriber, { message: '' })

  return (
    <div className="max-w-3xl mx-auto text-center px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Prenumerera på Nyhetsbrevet
      </h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Håll dig uppdaterad med de senaste nyheterna och uppdateringar. Anmäl dig så får du utskick
        direkt till din mejl.
      </p>
      <form action={action} className="flex flex-col items-center justify-center gap-4">
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

      {state.message && (
        <p
          className={`text-sm mt-3 ${state.message.includes('Error') ? 'text-red-700' : 'text-green-700'}`}
        >
          {state.message}
        </p>
      )}
    </div>
  )
}

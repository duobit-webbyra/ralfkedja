'use client'

import React, { useState, useEffect } from 'react'
import { updateSubscriptions } from './actions'
import PrimaryButton from '@/app/components/button/primary-button'
import type { SubscriberCategory } from '@/payload-types'
import Container from '@/app/components/essentials/Container'

interface Props {
  token: string
  categories: SubscriberCategory[]
  activeCategoryIds: number[]
}
export default function UnsubscribeClient({ token, categories, activeCategoryIds }: Props) {
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    // Initiera endast med de som är aktiva
    setSelected(activeCategoryIds)
  }, [activeCategoryIds])

  const [message, setMessage] = useState<string>('')

  async function handleSave() {
    try {
      const msg = await updateSubscriptions(token, selected)
      setMessage(msg)
    } catch (err) {
      setMessage((err as Error).message)
    }
  }

  return (
    <Container className="pt-16 pb-48">
      <h1 className=" text-4xl! font-bold mb-4 ">Hantera dina prenumerationer</h1>

      {categories.length === 0 && <p>Inga kategorier tillgängliga.</p>}

      {categories.map((cat) => (
        <label key={cat.id} className="block w-max">
          <input
            type="checkbox"
            checked={selected.includes(cat.id)}
            onChange={(e) =>
              setSelected((prev) =>
                e.target.checked ? [...prev, cat.id] : prev.filter((id) => id !== cat.id),
              )
            }
          />
          <span className="ml-2 ">{cat.name}</span>
        </label>
      ))}

      <div className="w-max mt-8">
        <PrimaryButton onClick={handleSave}>Spara inställningar</PrimaryButton>
      </div>

      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </Container>
  )
}

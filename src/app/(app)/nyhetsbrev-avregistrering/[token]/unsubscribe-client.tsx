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
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSelected(activeCategoryIds)
  }, [activeCategoryIds])

  async function handleSave() {
    setLoading(true)
    setMessage('')
    try {
      const msg = await updateSubscriptions(token, selected)
      setMessage(msg)
    } catch (err) {
      setMessage((err as Error).message || 'Ett fel uppstod')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (categoryId: number, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId),
    )
    setMessage('') // Clear message when user makes changes
  }

  return (
    <Container className="pt-16 pb-48">
      <h1 className="text-4xl font-bold mb-4">Hantera dina prenumerationer</h1>
      <p className="text-gray-600 mb-6">
        Välj vilka nyhetsbrev du vill prenumerera på. Avmarkera alla för att avsluta alla
        prenumerationer.
      </p>

      {categories.length === 0 && <p>Inga kategorier tillgängliga.</p>}

      <div className="space-y-3 mb-8">
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(cat.id)}
              onChange={(e) => handleToggle(cat.id, e.target.checked)}
              className="mt-1"
            />
            <div>
              <span className="font-medium">{cat.name}</span>
              {cat.description && <p className="text-sm text-gray-600">{cat.description}</p>}
            </div>
          </label>
        ))}
      </div>

      <div className="w-max">
        <PrimaryButton onClick={handleSave} disabled={loading}>
          {loading ? 'Sparar...' : 'Spara inställningar'}
        </PrimaryButton>
      </div>

      {message && (
        <p
          className={`text-sm mt-4 ${message.includes('fel') || message.includes('Ogiltig') ? 'text-red-600' : 'text-green-600'}`}
        >
          {message}
        </p>
      )}
    </Container>
  )
}

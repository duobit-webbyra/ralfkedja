'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function updateSubscriptions(token: string, selectedCategoryIds: (string | number)[]) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'subscribers',
    where: { unsubscribeToken: { equals: token } },
    limit: 1,
  })

  if (!docs.length) throw new Error('Ogiltig token')

  const subscriber = docs[0]

  await payload.update({
    collection: 'subscribers',
    id: subscriber.id,
    data: { categories: selectedCategoryIds.map((id) => Number(id)) },
  })

  return selectedCategoryIds.length
    ? 'Dina prenumerationsinställningar har uppdaterats.'
    : 'Du har avslutat alla prenumerationer.'
}

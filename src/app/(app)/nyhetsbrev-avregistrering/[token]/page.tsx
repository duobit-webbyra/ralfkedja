import { getPayload } from 'payload'
import config from '@payload-config'
import UnsubscribeClient from './unsubscribe-client'
import type { SubscriberCategory } from '@/payload-types'

export default async function Page({ params }: { params: { token: string } }) {
  const payload = await getPayload({ config })

  // Hämta subscribern
  const { docs } = await payload.find({
    collection: 'subscribers',
    where: { unsubscribeToken: { equals: params.token } },
    limit: 1,
    depth: 2,
  })

  if (!docs.length) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">Ogiltig länk</h1>
        <p>Den här prenumerationslänken verkar inte vara giltig.</p>
      </div>
    )
  }
  const subscriber = docs[0]

  // Alla kategorier i systemet
  const { docs: allCategoriesDocs } = await payload.find({
    collection: 'subscriber-categories',
    limit: 1000,
  })
  const allCategories: SubscriberCategory[] = allCategoriesDocs

  // De kategorier som subscribern är aktiv på
  const activeCategoryIds: number[] = (subscriber.categories || [])
    .filter((c): c is SubscriberCategory => typeof c === 'object' && c !== null && 'id' in c)
    .map((c) => c.id)

  return (
    <UnsubscribeClient
      token={params.token}
      categories={allCategories}
      activeCategoryIds={activeCategoryIds}
    />
  )
}

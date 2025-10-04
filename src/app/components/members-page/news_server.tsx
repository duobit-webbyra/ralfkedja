import { getPayload } from 'payload'
import config from '@payload-config'
import NewsClient from './news_client'
import Link from 'next/link'

interface NewsServerProps {
  sliceList?: boolean // New prop to fetch only the latest 6 news
}

export default async function NewsServer({ sliceList }: NewsServerProps) {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'posts',
      sort: '-createdAt',
      limit: sliceList ? 4 : undefined,
    })

    return (
      <>
        <NewsClient initialPosts={docs} sliceList={sliceList} />
        {sliceList && (
          <div className="flex justify-center">
            <Link href="/medlemssida/nyheter" className=" hover:underline! ">
              Visa alla nyheter
            </Link>
          </div>
        )}
      </>
    )
  } catch (error) {
    return (
      <div className="p-6 bg-red-100 rounded-lg text-center">
        <h2 className="text-xl font-bold">Fel vid inläsning av nyheter</h2>
        <p>Det uppstod ett fel vid inläsning av nyheterna. Försök igen senare.</p>
      </div>
    )
  }
}

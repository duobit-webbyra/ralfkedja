import React from 'react'
import Container from '@/app/components/essentials/Container'
import { getUser } from '@/app/providers/getUser'
import { redirect } from 'next/navigation'
import NewsServer from '@/app/components/members-page/news_server'

export default async function VideoPage() {
  const user = await getUser()

  if (!user) {
    redirect('/logga-in')
    return null
  }

  return (
    <section className="bg-[#F9f9f9]">
      <Container className="py-16 ">
        <NewsServer sliceList={false} />
      </Container>
    </section>
  )
}

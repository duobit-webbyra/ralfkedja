import VideosList from '@/app/components/members-page/video_list'
import React from 'react'
import Container from '@/app/components/essentials/Container'
import { getUser } from '@/app/providers/getUser'
import { redirect } from 'next/navigation'

export default async function VideoPage() {
  const user = await getUser()

  if (!user) {
    redirect('/logga-in')
    return null
  }
  return (
    <Container className=" ">
      <VideosList />
    </Container>
  )
}

import VideosList from '@/app/components/members-page/video_list';
import React from 'react';
import Container from '@/app/components/essentials/Container';
import { getUser } from '@/app/providers/auth-server';
import { redirect } from 'next/navigation';

export default async function VideoPage() {
  const user = await getUser();

  if (!user) {
    redirect('/logga-in');
    return null;
  }
  return (
    <Container className='py-16 '>
      <VideosList />
    </Container>
  );
}

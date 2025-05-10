import VideosList from '@/app/components/members-page/video_list';
import React from 'react';
import Container from '@/app/components/essentials/Container';
import { getUser } from '@/app/providers/auth-server';
import { redirect } from 'next/navigation';
import NewsClient from '@/app/components/members-page/news_client';
import NewsServer from '@/app/components/members-page/news_server';

export default async function VideoPage() {
  const user = await getUser();

  if (!user) {
    redirect('/logga-in');
    return null;
  }

  return (
    <section className='bg-[#F9f9f9]'>
      <Container className='py-16 '>
        <NewsServer user={user} sliceList={false} />
      </Container>
    </section>
  );
}

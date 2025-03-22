import { redirect } from 'next/navigation';
import { getUser } from '@/app/providers/auth-server';
import VideosList from '@/app/components/members-page/video_list';
import Container from '@/app/components/essentials/Container';
export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect('/logga-in');
    return null; // Prevent further rendering
  }

  return (
    <section className='relative '>
      <Container>
        <h1>Videos</h1>
        <VideosList />
      </Container>
    </section>
  );
}

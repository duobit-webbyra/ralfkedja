import { redirect } from 'next/navigation';
import { getUser } from '@/app/providers/auth-server';
import VideosList from '@/app/components/members-page/video_list';
import Container from '@/app/components/essentials/Container';
import NewsServer from '@/app/components/members-page/news_server';
export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect('/logga-in');
    return null;
  }

  return (
    <section className='relative '>
      <div className='flex flex-col justify-center items-center py-16 gap-2 bg-tertiary-200'>
        <h1 className=''>Medlemssida</h1>
        <h3 className='text-primary-300!'>
          Välkommen till medlemssidan där du kan hitta exklusiva videos och nyheter!
        </h3>
      </div>

      <Container>
        <VideosList sliceList={true} />
        <NewsServer />
      </Container>
    </section>
  );
}

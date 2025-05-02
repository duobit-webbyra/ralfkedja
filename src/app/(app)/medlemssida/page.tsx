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
    <div className='relative '>
      <div className='flex flex-col justify-center items-center py-8 gap-2 bg-secondary-100'>
        <Container>
          <h1 className='text-center '>Medlemssida</h1>
          <h3 className='text-primary-300! text-center'>
            Välkommen till medlemssidan där du kan hitta exklusiva videos och nyheter!
          </h3>
        </Container>
      </div>
      <section>
        <Container className='py-16 flex flex-col gap-16'>
          <VideosList sliceList={true} />
        </Container>
      </section>
      <section className='bg-[#F5F5F5]'>
        <Container className='py-16 flex flex-col gap-8 '>
          <NewsServer />
        </Container>
      </section>
    </div>
  );
}

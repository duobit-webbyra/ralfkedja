import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound, redirect } from 'next/navigation';
import { getUser } from '@/app/providers/auth-server';
import Container from '@/app/components/essentials/Container';

export default async function VideoPage({ params }: { params: { id: string } }) {
  const user = await getUser();

  if (!user) {
    redirect('/logga-in');
  }

  const payload = await getPayload({ config });
  const paramsId = params.id;
  const video = await payload.findByID({
    collection: 'videos',
    id: paramsId,
  });

  if (!video) {
    notFound();
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getYoutubeEmbedLink = (url: string) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error('Failed to parse YouTube URL:', error);
      return ''; // Return an empty string or handle the error as needed
    }
  };

  return (
    <Container className='py-16'>
      <div className='flex flex-col pb-6 gap-4'>
        <h1 className='text-3xl! md:text-5xl!'>{video.title}</h1>
        <p className='text-gray-700'>{video.description}</p>
      </div>
      {isValidUrl(video.url) ? (
        <div className='w-full aspect-video relative rounded overflow-hidden shadow-lg'>
          <iframe
            src={getYoutubeEmbedLink(video.url)}
            className='absolute inset-0 w-full h-full'
            title={video.title}
            allowFullScreen
            loading='lazy'
          ></iframe>
        </div>
      ) : (
        <p className='p-4 bg-red-50 text-red-700 rounded-lg'>Videon är ej tillgänglig.</p>
      )}
    </Container>
  );
}

import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound, redirect } from 'next/navigation';
import { getUser } from '@/app/providers/auth-server';

export default async function VideoPage({ params }: { params: { id: string } }) {
  const user = await getUser();

  if (!user) {
    redirect('/logga-in');
  }

  const payload = await getPayload({ config });
  const paramsId = await params.id;
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

  return (
    <div>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      {isValidUrl(video.url) ? (
        <iframe
          src={video.url}
          width='100%'
          height='300px'
          title={video.title}
          allowFullScreen
        ></iframe>
      ) : (
        <p>Videon är ej tillgänglig.</p>
      )}
    </div>
  );
}

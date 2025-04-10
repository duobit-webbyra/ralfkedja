import { getPayload } from 'payload';
import Link from 'next/link';
import config from '@payload-config';
import { getUser } from '@/app/providers/auth-server';
import Image from 'next/image';

interface VideoListProps {
  sliceList?: boolean;
}

export default async function VideosList({ sliceList }: VideoListProps) {
  const user = await getUser();

  if (!user) {
    return <p>Du måste vara inloggad för att se alla videos.</p>;
  }

  const payload = await getPayload({ config });

  const videos = await payload.find({
    collection: 'videos',
  });

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split('/watch?v=')[1]?.split('&')[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  const latestVideos = sliceList ? videos.docs.slice(0, 6) : videos.docs;

  return (
    <section className='py-8 gap-8 flex flex-col'>
      <h1>Videos</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
        {latestVideos.length > 0 ? (
          latestVideos.map((video: any) => {
            const thumbnail = getYouTubeThumbnail(video.url);

            return (
              <Link
                href={`/medlemssida/video/${video.id}`}
                key={video.id}
                className='flex flex-col'
              >
                {thumbnail ? (
                  <div className='relative w-full h-[250px] overflow-hidden rounded bg-gray-200'>
                    <Image
                      src={thumbnail}
                      alt={`${video.title} thumbnail`}
                      layout='fill' // Ensures the image fills the container
                      objectFit='cover' // Ensures the image covers the container
                      className='rounded'
                    />
                  </div>
                ) : (
                  <div className='flex items-center justify-center w-full h-[250px] bg-primary-100! rounded'>
                    <span className='text-4xl! text-tertiary-100! font-bold'>?</span>
                  </div>
                )}
                <h3>{video.title}</h3>
                <p className='text-primary-200! line-clamp-2'>{video.description}</p>
              </Link>
            );
          })
        ) : (
          <p>Inga videos är uppladdade!</p>
        )}
      </div>
      <div className='mt-6 text-center'>
        <Link href='/medlemssida/videos' className='underline!'>
          Gå till alla videos
        </Link>
      </div>
    </section>
  );
}

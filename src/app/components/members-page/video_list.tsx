import { getPayload } from 'payload';
import Link from 'next/link';
import config from '@payload-config';
import { getUser } from '@/app/providers/auth-server';
import styles from './video_list.module.scss';
import Image from 'next/image';

export default async function VideosList() {
  const user = await getUser();

  if (!user) {
    return <p>Du måste vara inloggad för att se alla videos.</p>;
  }

  const payload = await getPayload({ config });

  const videos = await payload.find({
    collection: 'videos',
  });

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split('/watch?v=')[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/nature.webp';
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
      {videos.docs.length > 0 ? (
        videos.docs.map((video: any) => (
          <Link href={`/medlemssida/video/${video.id}`} key={video.id}>
            <Image
              src={getYouTubeThumbnail(video.url)}
              width={500}
              height={300}
              alt={`${video.title} thumbnail`}
              className='w-full h-auto object-cover rounded'
            />
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </Link>
        ))
      ) : (
        <p>Inga videos är uppladdade</p>
      )}
    </div>
  );
}

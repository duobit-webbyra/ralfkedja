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
    const videoId = url.split('embed/')[1]?.split('?')[0];
    console.log(videoId);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/nature.webp';
  };

  return (
    <div className={styles.videoList}>
      {videos.docs.length > 0 ? (
        videos.docs.map((video: any) => (
          <Link href={`/medlemssida/video/${video.id}`} key={video.id} className={styles.videoCard}>
            <Image
              src={getYouTubeThumbnail(video.url)}
              width={500}
              height={300}
              alt={`${video.title} thumbnail`}
            />
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </Link>
        ))
      ) : (
        <p>No videos found</p>
      )}
    </div>
  );
}

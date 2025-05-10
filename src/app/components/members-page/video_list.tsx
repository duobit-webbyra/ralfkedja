import { getPayload } from 'payload';
import Link from 'next/link';
import config from '@payload-config';
import Image from 'next/image';

interface VideoListProps {
  sliceList?: boolean;
}

export default async function VideosList({ sliceList }: VideoListProps) {
  const payload = await getPayload({ config });

  const videos = await payload.find({
    collection: 'videos',
    sort: '-createdAt', // Sort by newest first
    limit: sliceList ? 6 : undefined, // Fetch only 6 videos if sliceList is true
  });

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split('/watch?v=')[1]?.split('&')[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  const latestVideos = sliceList ? videos.docs.slice(0, 6) : videos.docs;

  return (
    <section className='md:py-8  gap-8 flex flex-col '>
      <div className='flex flex-col '>
        {sliceList ? (
          <h1 className='text-[1.5rem]! md:text-3xl!'>Senast uppladdade videos</h1>
        ) : (
          <h1 className='text-center '>Alla videos</h1>
        )}
        {sliceList && (
          <p className=' '>
            Utforska videor som täcker ämnen som kroppsbalansering, yinyoga och andra
            hälsorelaterade tekniker.
          </p>
        )}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full'>
        {latestVideos.length > 0 ? (
          latestVideos.map((video: any) => {
            const thumbnail = getYouTubeThumbnail(video.url);

            return (
              <Link
                href={`/medlemssida/video/${video.id}`}
                key={video.id}
                className='flex flex-col group'
              >
                {thumbnail ? (
                  <div className='relative w-full h-[250px] overflow-hidden rounded bg-gray-200'>
                    <Image
                      src={thumbnail}
                      alt={`${video.title} thumbnail`}
                      fill
                      className='group rounded object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                ) : (
                  <div className='flex items-center justify-center w-full h-[250px] bg-black rounded'>
                    <span className='text-4xl! text-tertiary-100! font-bold'>?</span>
                  </div>
                )}
                <div className='flex items-center justify-between gap-1'>
                  <h3 className='text-[18px]! md:text-xl!  line-clamp-1'>{video.title}</h3>
                  <p className='text-gray-500! text-xs! whitespace-nowrap '>
                    {new Date(video.createdAt).toLocaleDateString('sv-SE', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </p>
                </div>
                <p className='text-primary-200! line-clamp-2'>{video.description}</p>
              </Link>
            );
          })
        ) : (
          <p>Inga videos är uppladdade!</p>
        )}
      </div>
      {sliceList && (
        <div className='mt-6 text-center'>
          <Link href='/medlemssida/videos' className='hover:underline!'>
            Gå till alla videos
          </Link>
        </div>
      )}
    </section>
  );
}

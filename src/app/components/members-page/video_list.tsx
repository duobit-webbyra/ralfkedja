// app/medlemssida/videos-list.tsx
import { getPayload } from 'payload';
import { cookies } from 'next/headers'; // Get auth token on the server
import config from '@payload-config';
export default async function VideosList() {
  const payload = await getPayload({ config });

  const videos = await payload.find({
    collection: 'videos',
  });

  return (
    <div>
      {videos.docs.length > 0 ? (
        videos.docs.map((video: any) => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <video width='320' height='240' controls>
              <source src={video.url} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        ))
      ) : (
        <p>No videos found</p>
      )}
    </div>
  );
}

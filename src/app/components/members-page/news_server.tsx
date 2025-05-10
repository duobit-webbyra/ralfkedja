import { getPayload } from 'payload';
import config from '@payload-config';
import NewsClient from './news_client';
import Link from 'next/link';
import { ClientNews } from './news_client';

interface NewsServerProps {
  user: {
    user: {
      id: string;
      name: string;
    };
  };
  sliceList?: boolean; // New prop to fetch only the latest 6 news
}

export default async function NewsServer({ user, sliceList }: NewsServerProps) {
  try {
    const payload = await getPayload({ config });

    const news_response = await payload.find({
      collection: 'news',
      sort: '-createdAt',
      depth: 1,
      limit: sliceList ? 4 : undefined,
    });

    // Convert to ClientNews format
    const newsPosts: ClientNews[] = news_response.docs.map((post) => ({
      id: post.id,
      title: post.title as string,
      content: post.content as string,
      createdAt: post.createdAt as string,
      likes: (post.likes || []).map((like: any) => ({
        user: typeof like.user === 'string' ? like.user : like.user?.id, // Normalize user field
      })),
      comments: (post.comments || []).slice(0, 3).map((comment: any) => ({
        id: comment.id as string,
        comment: comment.comment as string,
        author: {
          id: comment.author.id as string,
          name: comment.author.name as string,
        },
        createdAt: comment.createdAt || new Date().toISOString(),
        likes: (comment.likes || []).map((like: any) => ({
          user: typeof like.user === 'string' ? like.user : like.user?.id, // Normalize user field
        })),
      })),
    }));

    return (
      <>
        <NewsClient newsPosts={newsPosts} user={user} sliceList={sliceList} />
        {sliceList && (
          <div className='flex justify-center'>
            <Link href='/medlemssida/nyheter' className=' hover:underline! '>
              Visa alla nyheter
            </Link>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('Error loading news:', error);
    return (
      <div className='p-6 bg-red-100 rounded-lg text-center'>
        <h2 className='text-xl font-bold'>Fel vid inläsning av nyheter</h2>
        <p>Det uppstod ett fel vid inläsning av nyheterna. Försök igen senare.</p>
      </div>
    );
  }
}

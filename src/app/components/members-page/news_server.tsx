import { getPayload } from 'payload';
import config from '@payload-config';
import NewsClient from './news_client';
import { getUser } from '@/app/providers/auth-server';
import { ClientNews } from './news_client';

export default async function NewsServer() {
  try {
    const payload = await getPayload({ config });
    const user = await getUser();

    if (!user) {
      // Handle unauthenticated user case
      return (
        <div className='p-6 bg-red-100 rounded-lg text-center'>
          <h2 className='text-xl font-bold'>Authentication Required</h2>
          <p>Please log in to view news and comments.</p>
        </div>
      );
    }

    const news_response = await payload.find({
      collection: 'news',
      sort: '-createdAt', // Sort by newest first
      depth: 1, // Limit depth of relationship resolution
    });

    // Convert to ClientNews format, sanitizing data to prevent leakage
    const newsPosts: ClientNews[] = news_response.docs.map((post) => ({
      id: post.id,
      title: post.title as string,
      content: post.content as string,
      createdAt: post.createdAt as string,
      likes: (post.likes || []).map((like: any) => ({
        user: typeof like.user === 'string' ? like.user : like.user?.id, // Normalize user field
      })),
      comments: (post.comments || []).map((comment: any) => ({
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

    return <NewsClient newsPosts={newsPosts} user={user} />;
  } catch (error) {
    console.error('Error loading news:', error);
    return (
      <div className='p-6 bg-red-100 rounded-lg text-center'>
        <h2 className='text-xl font-bold'>Error Loading News</h2>
        <p>There was an error loading the news. Please try again later.</p>
      </div>
    );
  }
}

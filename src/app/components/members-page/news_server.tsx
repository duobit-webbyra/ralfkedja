import { getPayload } from 'payload';
import config from '@payload-config';
import NewsClient from './news_client';

export default async function NewsServer() {
  const payload = await getPayload({ config });

  const response = await payload.find({
    collection: 'news', // Fetch from the 'news' collection
  });

  // Ensure comments are always an array and createdAt is always a string
  const newsPosts = response.docs.map((post) => ({
    ...post,
    comments: (post.comments || []).map((comment) => ({
      ...comment,
      createdAt: comment.createdAt || new Date().toISOString(), // Default to current date if undefined or null
    })),
  }));

  return <NewsClient newsPosts={newsPosts} />;
}

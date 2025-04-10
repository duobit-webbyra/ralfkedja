'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

export async function saveComment(formData: FormData) {
  const postId = formData.get('postId')?.toString();
  const comment = formData.get('comment')?.toString();
  const author = formData.get('author')?.toString() || 'Anonymous';

  if (!postId || !comment) {
    return { status: 'error', message: 'Post ID and comment are required.' };
  }

  try {
    const payload = await getPayload({ config });

    // Try to find the specific document
    try {
      const existingPost = await payload.findByID({
        collection: 'news',
        id: postId,
      });

      console.log('Post found:', existingPost?.id === postId);

      if (!existingPost) {
        return { status: 'error', message: 'Post not found.' };
      }

      // Check for duplicate comments
      if (
        existingPost.comments?.some(
          (existingComment) =>
            existingComment.comment === comment && existingComment.author === author,
        )
      ) {
        return { status: 'error', message: 'Duplicate comment detected.' };
      }

      // Now update the post with the new comment
      const updatedPost = await payload.update({
        collection: 'news',
        id: postId,
        data: {
          comments: [
            ...(existingPost.comments || []),
            {
              comment,
              author,
              createdAt: new Date().toISOString(),
            },
          ],
        },
      });

      console.log('Comment added successfully to post:', updatedPost.id);

      return {
        status: 'success',
        data: {
          postId,
          comment,
          author,
        },
      };
    } catch (e) {
      console.error('Failed to find or update post:', e);
      return { status: 'error', message: 'Could not find or update the post.' };
    }
  } catch (error) {
    console.error('Failed to save comment:', error);
    return { status: 'error', message: 'Failed to save comment.' };
  }
}

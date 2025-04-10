'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

export async function saveComment(formData: FormData) {
  const postId = formData.get('postId');
  const comment = formData.get('comment');
  const author = formData.get('author') || 'Anonymous';

  if (!postId || !comment) {
    throw new Error('Post ID and comment are required');
  }

  const payload = await getPayload({ config });

  try {
    const updatedPost = await payload.update({
      collection: 'news',
      id: postId.toString(),
      data: {
        $push: {
          comments: {
            comment: comment.toString(),
            author: author.toString(),
            createdAt: new Date().toISOString(),
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Comment added successfully',
      updatedPost,
    };
  } catch (error) {
    console.error('Failed to save comment:', error);
    return {
      status: 'error',
      message: 'Failed to save comment',
    };
  }
}

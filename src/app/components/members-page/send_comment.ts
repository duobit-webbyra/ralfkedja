'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

import { v4 as uuidv4 } from 'uuid'; // Install uuid with `npm install uuid`

export async function saveComment(formData: FormData) {
  const postId = formData.get('postId')?.toString();
  const comment = formData.get('comment')?.toString();
  const author = formData.get('author')?.toString() || 'Anonymous';

  if (!postId || !comment) {
    return { status: 'error', message: 'Post ID and comment are required.' };
  }

  try {
    const payload = await getPayload({ config });

    const existingPost = await payload.findByID({
      collection: 'news',
      id: postId,
    });

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

    // Generate a unique ID for the new comment
    const newComment = {
      id: uuidv4(), // Generate a unique ID
      comment,
      author,
      createdAt: new Date().toISOString(),
    };

    // Update the post with the new comment
    const updatedPost = await payload.update({
      collection: 'news',
      id: postId,
      data: {
        comments: [...(existingPost.comments || []), newComment],
      },
    });

    console.log('Comment added successfully to post:', updatedPost.id);

    return {
      status: 'success',
      data: {
        postId,
        comment: newComment.comment,
        author: newComment.author,
        id: newComment.id, // Return the new comment ID
      },
    };
  } catch (error) {
    console.error('Failed to save comment:', error);
    return { status: 'error', message: 'Failed to save comment.' };
  }
}

export async function deleteComment(postId: string, userId: string, commentId: string) {
  // if (!postId || !userId || !commentId) {
  //   return { status: 'error', message: 'Post ID, user ID, and comment ID are required.' };
  // }
  if (!postId) {
    return { status: 'error', message: 'post ID is required.' };
  }
  if (!userId) {
    return { status: 'error', message: 'user ID is required.' };
  }
  if (!commentId) {
    return { status: 'error', message: 'comment ID is required.' };
  }

  try {
    const payload = await getPayload({ config });

    // Find the specific post
    const existingPost = await payload.findByID({
      collection: 'news',
      id: postId,
    });

    if (!existingPost) {
      return { status: 'error', message: 'Post not found.' };
    }

    // Filter out the comment to be deleted
    const updatedComments = (existingPost.comments ?? []).filter(
      (comment) => comment.id !== commentId,
    );

    // Update the post with the filtered comments
    const updatedPost = await payload.update({
      collection: 'news',
      id: postId,
      data: {
        comments: updatedComments,
      },
    });

    console.log('Comment deleted successfully from post:', updatedPost.id);

    return {
      status: 'success',
      data: {
        postId,
        commentId,
      },
    };
  } catch (error) {
    console.error('Failed to delete comment:', error);
    return { status: 'error', message: 'Failed to delete comment.' };
  }
}

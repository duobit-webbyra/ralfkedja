'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { getUser } from '@/app/providers/auth-server';
import { v4 as uuidv4 } from 'uuid';

type CommentResponse = {
  status: 'success' | 'error';
  message?: string;
  data?: {
    postId?: string;
    commentId?: string;
  };
};

export async function saveComment(formData: FormData): Promise<CommentResponse> {
  const postId = formData.get('postId')?.toString();
  const comment = formData.get('comment')?.toString();
  const commentId = formData.get('commentId')?.toString();
  const authorId = formData.get('author')?.toString();

  // Validate input
  if (!postId || !comment || !authorId) {
    return { status: 'error', message: 'Post ID, comment, and author ID are required.' };
  }

  if (comment.trim().length === 0) {
    return { status: 'error', message: 'Comment cannot be empty.' };
  }

  try {
    // Get authenticated user to verify identity
    const currentUser = await getUser();

    if (!currentUser || currentUser.user.id !== authorId) {
      return { status: 'error', message: 'Unauthorized: User authentication failed.' };
    }

    const payload = await getPayload({ config });

    // Verify the post exists
    const existingPost = await payload.findByID({
      collection: 'news',
      id: postId,
    });

    if (!existingPost) {
      return { status: 'error', message: 'Post not found.' };
    }

    // Create new comment with sanitized data
    const newComment = {
      id: commentId,
      comment: comment.trim(),
      author: {
        id: authorId,
        name: currentUser.user.name,
      },
      createdAt: new Date().toISOString(),
    };

    // Update the post with the new comment
    await payload.update({
      collection: 'news',
      id: postId,
      data: {
        comments: [...(existingPost.comments || []), newComment],
      },
    });

    return {
      status: 'success',
      data: {
        postId,
        commentId: newComment.id,
      },
    };
  } catch (error) {
    console.error('Failed to save comment:', error);
    return { status: 'error', message: 'Failed to save comment. Please try again.' };
  }
}

export async function deleteComment(
  postId: string,
  userId: string,
  commentId: string,
): Promise<CommentResponse> {
  // Validate input
  if (!postId) {
    return { status: 'error', message: 'Post ID is required.' };
  }
  if (!userId) {
    return { status: 'error', message: 'User ID is required.' };
  }
  if (!commentId) {
    return { status: 'error', message: 'Comment ID is required.' };
  }

  try {
    // Get authenticated user to verify identity
    const currentUser = await getUser();

    if (!currentUser || currentUser.user.id !== userId) {
      return { status: 'error', message: 'Unauthorized: User authentication failed.' };
    }

    const payload = await getPayload({ config });

    // Find the post
    const existingPost = await payload.findByID({
      collection: 'news',
      id: postId,
    });

    if (!existingPost) {
      return { status: 'error', message: 'Post not found.' };
    }

    // Find the comment
    const commentToDelete = (existingPost.comments || []).find(
      (comment) => comment.id === commentId,
    );

    if (!commentToDelete) {
      return { status: 'error', message: 'Comment not found.' };
    }

    // Verify user owns the comment
    if (commentToDelete.author.id !== userId) {
      return { status: 'error', message: 'Unauthorized: You can only delete your own comments.' };
    }

    // Remove the comment
    const updatedComments = (existingPost.comments || []).filter(
      (comment) => comment.id !== commentId,
    );

    // Update the post
    await payload.update({
      collection: 'news',
      id: postId,
      data: {
        comments: updatedComments,
      },
    });

    return {
      status: 'success',
      data: {
        postId,
        commentId,
      },
    };
  } catch (error) {
    console.error('Failed to delete comment:', error);
    return { status: 'error', message: 'Failed to delete comment. Please try again.' };
  }
}

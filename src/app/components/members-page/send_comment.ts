'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { getUser } from '@/app/providers/auth-server';
import { v4 as uuidv4 } from 'uuid';
type RawComment = {
  id?: string | null;
  comment?: string;
  author?: string | { id?: string | null; name?: string | null };
  createdAt?: string | null;
  likes?: { user: string | { id: string } }[] | null;
};
type CommentResponse = {
  status: 'success' | 'error';
  message?: string;
  data?: {
    postId?: string;
    commentId?: string;
    comments?: RawComment[];
  };
};

export async function fetchAllComments(postId: string): Promise<CommentResponse> {
  if (!postId) {
    return { status: 'error', message: 'Post ID is required.' };
  }

  try {
    const payload = await getPayload({ config });

    // Fetch the post with all comments
    const post = await payload.findByID({
      collection: 'news',
      id: postId,
      depth: 1, // Ensure we fetch related data
    });

    if (!post) {
      return { status: 'error', message: 'Post not found.' };
    }

    return {
      status: 'success',
      data: {
        comments: post.comments || [], // Return all comments
      },
    };
  } catch (error) {
    console.error('Error fetching all comments:', error);
    return { status: 'error', message: 'Failed to fetch comments. Please try again.' };
  }
}

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
    const authorId =
      typeof commentToDelete.author === 'string'
        ? commentToDelete.author
        : commentToDelete.author?.id;

    if (authorId !== userId) {
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

// Helper to check if a user has liked something
function hasUserLiked(
  likes: { user: string | { id: string } }[] | null | undefined,
  userId: string,
) {
  return (
    likes?.some((like) => {
      const likeUserId = typeof like.user === 'string' ? like.user : like.user.id;
      return likeUserId === userId;
    }) || false
  );
}

// Server-side post like function
export async function likePost(
  postId: string,
  userId: string,
): Promise<{ status: string; message?: string }> {
  try {
    const payload = await getPayload({ config });

    // Fetch the post
    const post = await payload.findByID({
      collection: 'news',
      id: postId,
    });

    if (!post) {
      return { status: 'error', message: 'Post not found.' };
    }

    // Check if user has already liked
    const alreadyLiked = hasUserLiked(post.likes, userId);

    // Update likes - add or remove based on server check
    let updatedLikes;
    if (alreadyLiked) {
      // Remove like
      updatedLikes = post.likes?.filter((like) => {
        const likeUserId = typeof like.user === 'string' ? like.user : like.user.id;
        return likeUserId !== userId;
      });
    } else {
      // Add like
      updatedLikes = [...(post.likes || []), { user: userId }];
    }

    // Update database
    await payload.update({
      collection: 'news',
      id: postId,
      data: { likes: updatedLikes },
    });

    return { status: 'success' };
  } catch (error) {
    console.error('Error toggling like on post:', error);
    return { status: 'error', message: 'Failed to toggle like on post.' };
  }
}

// Server-side comment like function
export async function likeComment(
  postId: string,
  commentId: string,
  userId: string,
): Promise<{ status: string; message?: string }> {
  try {
    const payload = await getPayload({ config });

    // Fetch the post
    const post = await payload.findByID({
      collection: 'news',
      id: postId,
    });

    if (!post) {
      return { status: 'error', message: 'Post not found.' };
    }

    // Find the comment
    const comment = post.comments?.find((c) => c.id === commentId);
    if (!comment) {
      return { status: 'error', message: 'Comment not found.' };
    }

    // Check if user has already liked
    const alreadyLiked = hasUserLiked(comment.likes, userId);

    // Update comments with modified like
    const updatedComments = (post.comments ?? []).map((c) => {
      if (c.id === commentId) {
        let updatedLikes;
        if (alreadyLiked) {
          // Remove like
          updatedLikes = c.likes?.filter((like) => {
            const likeUserId = typeof like.user === 'string' ? like.user : like.user.id;
            return likeUserId !== userId;
          });
        } else {
          // Add like
          updatedLikes = [...(c.likes || []), { user: userId }];
        }
        return { ...c, likes: updatedLikes };
      }
      return c;
    });

    // Update database
    await payload.update({
      collection: 'news',
      id: postId,
      data: { comments: updatedComments },
    });

    return { status: 'success' };
  } catch (error) {
    console.error('Error toggling like on comment:', error);
    return { status: 'error', message: 'Failed to toggle like on comment.' };
  }
}

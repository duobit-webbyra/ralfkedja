'use server';

import payload from 'payload';

interface SaveCommentResponse {
  status: 'success' | 'error';
  message?: string;
  data?: {
    postId: string;
    comment: string;
    author: string;
  };
}

export async function saveComment(formData: FormData): Promise<SaveCommentResponse> {
  const postId = formData.get('postId')?.toString();
  const comment = formData.get('comment')?.toString();
  const author = formData.get('author')?.toString() || 'Anonymous';

  if (!postId || !comment) {
    return { status: 'error', message: 'Post ID and comment are required.' };
  }

  try {
    console.log('Fetching post with ID:', postId);

    // Fetch the existing post to check for duplicate comments
    const existingPost = await payload.findByID({
      collection: 'news',
      id: postId,
      depth: 2,
      fallbackLocale: false,
      overrideAccess: false,
      showHiddenFields: true,
    });

    if (!existingPost) {
      console.error('Post not found for ID:', postId);
      return { status: 'error', message: 'Post not found.' };
    }

    if (
      existingPost.comments?.some(
        (existingComment) =>
          existingComment.comment === comment && existingComment.author === author,
      )
    ) {
      return { status: 'error', message: 'Duplicate comment detected.' };
    }

    // Update the post with the new comment
    const updatedPost = await payload.update({
      collection: 'news', // Ensure this matches the actual collection name in Payload CMS
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

    return {
      status: 'success',
      data: {
        postId,
        comment,
        author,
      },
    };
  } catch (error) {
    console.error('Failed to save comment:', error); // Debug log for errors
    return { status: 'error', message: 'Failed to save comment.' };
  }
}

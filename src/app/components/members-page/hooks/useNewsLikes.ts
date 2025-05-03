// hooks/useNewsLikes.ts
import { useState } from 'react';
import { ClientNews } from '../news_client'; // Adjust the import path as needed

type LikePostFunction = (
  postId: string,
  userId: string,
) => Promise<{
  status: string;
  message?: string;
  wasLiked?: boolean;
}>;

type LikeCommentFunction = (
  postId: string,
  commentId: string,
  userId: string,
) => Promise<{
  status: string;
  message?: string;
  wasLiked?: boolean;
}>;

interface UseNewsLikesReturn {
  newsPosts: ClientNews[];
  handleLikePost: (postId: string) => Promise<void>;
  handleLikeComment: (postId: string, commentId: string) => Promise<void>;
  isLikeInProgress: (type: 'post' | 'comment', postId: string, commentId?: string) => boolean;
}

export function useNewsLikes(
  initialNewsPosts: ClientNews[],
  user: { user: { id: string } },
  likePost: LikePostFunction,
  likeComment: LikeCommentFunction,
): UseNewsLikesReturn {
  const [newsPosts, setNewsPosts] = useState<ClientNews[]>(initialNewsPosts);
  // Track ongoing like operations to prevent duplicate requests
  const [pendingLikes, setPendingLikes] = useState<Set<string>>(new Set());

  /**
   * Check if a like operation is in progress
   */
  const isLikeInProgress = (
    type: 'post' | 'comment',
    postId: string,
    commentId?: string,
  ): boolean => {
    const operationKey = type === 'post' ? `post-${postId}` : `comment-${postId}-${commentId}`;
    return pendingLikes.has(operationKey);
  };

  /**
   * Handles liking/unliking a post
   */
  const handleLikePost = async (postId: string) => {
    // Prevent duplicate operations
    const operationKey = `post-${postId}`;
    if (pendingLikes.has(operationKey)) {
      return; // Operation in progress, ignore
    }

    // Get the current post
    const post = newsPosts.find((p) => p.id === postId);
    if (!post) {
      console.error('Post not found');
      return;
    }

    // Check if user has liked this post
    const clientSideAlreadyLiked = post.likes?.some((like) => {
      return typeof like.user === 'string'
        ? like.user === user.user.id
        : (like.user as any).id === user.user.id;
    });

    // Mark operation as pending
    setPendingLikes((prev) => new Set(prev).add(operationKey));

    // Create a deep copy of the post likes for manipulation
    const updatedLikes = clientSideAlreadyLiked
      ? post.likes?.filter((like) => {
          const likeUserId = typeof like.user === 'string' ? like.user : (like.user as any).id;
          return likeUserId !== user.user.id;
        })
      : [...(post.likes || []), { user: user.user.id }];

    // Apply optimistic update
    setNewsPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === postId ? { ...p, likes: updatedLikes } : p)),
    );

    try {
      // Call server action
      const result = await likePost(postId, user.user.id);

      if (result.status !== 'success') {
        // Revert on error
        console.error('Failed to toggle like on post:', result.message);

        // Revert to previous state
        setNewsPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId
              ? { ...p, likes: post.likes } // Revert to original likes state
              : p,
          ),
        );

        // Show error to user
        alert(result.message || 'Failed to toggle like on post.');
      } else if (result.wasLiked !== undefined) {
        // If server provides the accurate like state, use it
        // This ensures client and server stay in sync
        setNewsPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.id !== postId) return p;

            // Filter out any potential duplicate likes
            const currentLikes =
              p.likes?.filter((like) => {
                const likeUserId =
                  typeof like.user === 'string' ? like.user : (like.user as any).id;
                return likeUserId !== user.user.id;
              }) || [];

            // Add user's like if server says it's liked
            return {
              ...p,
              likes: result.wasLiked ? [...currentLikes, { user: user.user.id }] : currentLikes,
            };
          }),
        );
      }
    } catch (error) {
      console.error('Error toggling like on post:', error);
      alert('An error occurred while toggling the like on the post.');

      // Revert on exception
      setNewsPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId
            ? { ...p, likes: post.likes } // Revert to original likes state
            : p,
        ),
      );
    } finally {
      // Remove from pending operations
      setPendingLikes((prev) => {
        const updated = new Set(prev);
        updated.delete(operationKey);
        return updated;
      });
    }
  };

  /**
   * Handles liking/unliking a comment
   */
  const handleLikeComment = async (postId: string, commentId: string) => {
    // Prevent duplicate operations
    const operationKey = `comment-${postId}-${commentId}`;
    if (pendingLikes.has(operationKey)) {
      return; // Operation in progress, ignore
    }

    // Find post and comment
    const post = newsPosts.find((p) => p.id === postId);
    if (!post) {
      console.error('Post not found');
      return;
    }

    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment) {
      console.error('Comment not found');
      return;
    }

    // Check if user has liked this comment
    const clientSideAlreadyLiked = comment.likes?.some((like) =>
      typeof like.user === 'string'
        ? like.user === user.user.id
        : (like.user as any).id === user.user.id,
    );

    // Mark operation as pending
    setPendingLikes((prev) => new Set(prev).add(operationKey));

    // Store original comment for potential rollback
    const originalComment = { ...comment };

    // Create the updated likes array
    const updatedLikes = clientSideAlreadyLiked
      ? comment.likes?.filter((like) => {
          const likeUserId = typeof like.user === 'string' ? like.user : (like.user as any).id;
          return likeUserId !== user.user.id;
        })
      : [...(comment.likes || []), { user: user.user.id }];

    // Apply optimistic update
    setNewsPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId ? { ...c, likes: updatedLikes } : c,
              ),
            }
          : p,
      ),
    );

    try {
      // Call server action
      const result = await likeComment(postId, commentId, user.user.id);

      if (result.status !== 'success') {
        // Revert on error
        console.error('Failed to toggle like on comment:', result.message);

        // Roll back to original state
        setNewsPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  comments: p.comments.map((c) =>
                    c.id === commentId
                      ? originalComment // Use stored original comment
                      : c,
                  ),
                }
              : p,
          ),
        );

        alert(result.message || 'Failed to toggle like on comment.');
      } else if (result.wasLiked !== undefined) {
        // If server provides the accurate like state, use it
        setNewsPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.id !== postId) return p;

            return {
              ...p,
              comments: p.comments.map((c) => {
                if (c.id !== commentId) return c;

                // Filter out any potential duplicate likes
                const currentLikes =
                  c.likes?.filter((like) => {
                    const likeUserId =
                      typeof like.user === 'string' ? like.user : (like.user as any).id;
                    return likeUserId !== user.user.id;
                  }) || [];

                // Add user's like if server says it's liked
                return {
                  ...c,
                  likes: result.wasLiked ? [...currentLikes, { user: user.user.id }] : currentLikes,
                };
              }),
            };
          }),
        );
      }
    } catch (error) {
      console.error('Error toggling like on comment:', error);
      alert('An error occurred while toggling the like on the comment.');

      // Revert on exception
      setNewsPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: p.comments.map((c) =>
                  c.id === commentId
                    ? originalComment // Use stored original comment
                    : c,
                ),
              }
            : p,
        ),
      );
    } finally {
      // Remove from pending operations
      setPendingLikes((prev) => {
        const updated = new Set(prev);
        updated.delete(operationKey);
        return updated;
      });
    }
  };

  return {
    newsPosts,
    handleLikePost,
    handleLikeComment,
    isLikeInProgress,
  };
}

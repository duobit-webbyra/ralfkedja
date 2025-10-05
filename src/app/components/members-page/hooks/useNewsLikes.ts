// hooks/useNewsLikes.ts
import { useState } from 'react'
import type { Post } from '@/payload-types'
import type { Comment } from '@/payload-types'
type LikePostFunction = (
  postId: number,
  userId: number,
) => Promise<{
  status: string
  message?: string
  wasLiked?: boolean
}>

type LikeCommentFunction = (
  postId: number,
  commentId: number,
  userId: number,
) => Promise<{
  status: string
  message?: string
  wasLiked?: boolean
}>

interface UseNewsLikesReturn {
  newsPosts: Post[]
  handleLikePost: (postId: number) => Promise<void>
  handleLikeComment: (postId: number, commentId: number) => Promise<void>
  isLikeInProgress: (type: 'post' | 'comment', postId: number, commentId?: number) => boolean
  handleAddCommentLocally: (
    postId: number,
    commentText: string,
    commentId: number,
    authorId: number,
    authorName: string,
  ) => void
  handleDeleteComment: (postId: number, userId: number, commentId: number) => Promise<void>
  formatDate: (dateString: string) => string
}

type DeleteCommentFunction = (
  postId: number,
  userId: number,
  commentId: number,
) => Promise<{
  status: string
  message?: string
}>

export function useNewsLikes(
  initialNewsPosts: Post[],
  user: { user: { id: number } },
  likePost: LikePostFunction,
  likeComment: LikeCommentFunction,
  deleteComment: DeleteCommentFunction,
): UseNewsLikesReturn {
  const [newsPosts, setNewsPosts] = useState<Post[]>(initialNewsPosts)
  // Track ongoing like operations to prevent duplicate requests
  const [pendingLikes, setPendingLikes] = useState<Set<string>>(new Set())

  /**
   * Check if a like operation is in progress
   */
  const isLikeInProgress = (
    type: 'post' | 'comment',
    postId: number,
    commentId?: number,
  ): boolean => {
    const operationKey = type === 'post' ? `post-${postId}` : `comment-${postId}-${commentId}`
    return pendingLikes.has(operationKey)
  }

  /**
   * Handles liking/unliking a post
   */
  const handleLikePost = async (postId: number) => {
    // Prevent duplicate operations
    const operationKey = `post-${postId}`
    if (pendingLikes.has(operationKey)) {
      return // Operation in progress, ignore
    }

    // Get the current post
    const post = newsPosts.find((p) => p.id === postId)
    if (!post) {
      console.error('Post not found')
      return
    }

    // Check if user has liked this post
    const clientSideAlreadyLiked = post.likes?.some((like) => {
      return typeof like.user === 'number'
        ? like.user === user.user.id
        : (like.user as any).id === user.user.id
    })

    // Mark operation as pending
    setPendingLikes((prev) => new Set(prev).add(operationKey))

    // Create a deep copy of the post likes for manipulation
    const updatedLikes = clientSideAlreadyLiked
      ? post.likes?.filter((like) => {
          const likeUserId = typeof like.user === 'number' ? like.user : (like.user as any).id
          return likeUserId !== user.user.id
        })
      : [...(post.likes || []), { user: user.user.id }]

    // Apply optimistic update
    setNewsPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === postId ? { ...p, likes: updatedLikes } : p)),
    )

    try {
      // Call server action
      const result = await likePost(postId, user.user.id)

      if (result.status !== 'success') {
        // Revert on error
        console.error('Failed to toggle like on post:', result.message)

        // Revert to previous state
        setNewsPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId
              ? { ...p, likes: post.likes } // Revert to original likes state
              : p,
          ),
        )

        // Show error to user
        alert(result.message || 'Failed to toggle like on post.')
      } else if (result.wasLiked !== undefined) {
        // If server provides the accurate like state, use it
        // This ensures client and server stay in sync
        setNewsPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.id !== postId) return p

            // Filter out any potential duplicate likes
            const currentLikes =
              p.likes?.filter((like) => {
                const likeUserId = typeof like.user === 'number' ? like.user : (like.user as any).id
                return likeUserId !== user.user.id
              }) || []

            // Add user's like if server says it's liked
            return {
              ...p,
              likes: result.wasLiked ? [...currentLikes, { user: user.user.id }] : currentLikes,
            }
          }),
        )
      }
    } catch (error) {
      console.error('Error toggling like on post:', error)
      alert('An error occurred while toggling the like on the post.')

      // Revert on exception
      setNewsPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId
            ? { ...p, likes: post.likes } // Revert to original likes state
            : p,
        ),
      )
    } finally {
      // Remove from pending operations
      setPendingLikes((prev) => {
        const updated = new Set(prev)
        updated.delete(operationKey)
        return updated
      })
    }
  }

  /**
   * Handles liking/unliking a comment
   */
  const handleLikeComment = async (postId: number, commentId: number) => {
    const operationKey = `comment-${postId}-${commentId}`
    if (pendingLikes.has(operationKey)) return

    const post = newsPosts.find((p) => p.id === postId)
    if (!post) return console.error('Post not found')

    // Find the comment, skip numbers
    const commentItem = post.comments?.docs?.find((c): c is Comment => typeof c !== 'number')
    const comment = commentItem && commentItem.id === commentId ? commentItem : undefined
    if (!comment) return console.error('Comment not found')

    // Check if user already liked
    const clientSideAlreadyLiked = comment.likes?.some(
      (like): like is { user: number } =>
        typeof like.user === 'number' && like.user === user.user.id,
    )

    setPendingLikes((prev) => new Set(prev).add(operationKey))

    const originalComment = { ...comment }
    const updatedLikes = clientSideAlreadyLiked
      ? comment.likes?.filter((like) => like.user !== user.user.id)
      : [...(comment.likes ?? []), { user: user.user.id }]

    // Optimistic update
    setNewsPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: {
                ...p.comments,
                docs: p.comments?.docs?.map((c): Comment | number =>
                  typeof c !== 'number' && c.id === commentId ? { ...c, likes: updatedLikes } : c,
                ),
              },
            }
          : p,
      ),
    )

    try {
      const result = await likeComment(postId, commentId, user.user.id)

      if (result.status !== 'success') {
        console.error('Failed to toggle like on comment:', result.message)

        // Rollback
        setNewsPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  comments: {
                    ...p.comments,
                    docs: p.comments?.docs?.map((c) =>
                      typeof c !== 'number' && c.id === commentId ? originalComment : c,
                    ),
                  },
                }
              : p,
          ),
        )
        alert(result.message || 'Failed to toggle like on comment.')
        return
      }

      if (result.wasLiked !== undefined) {
        // Sync server state
        setNewsPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id !== postId
              ? p
              : {
                  ...p,
                  comments: {
                    ...p.comments,
                    docs: p.comments?.docs?.map((c) => {
                      if (typeof c === 'number' || c.id !== commentId) return c
                      const currentLikes =
                        c.likes?.filter((like) => like.user !== user.user.id) ?? []
                      return {
                        ...c,
                        likes: result.wasLiked
                          ? [...currentLikes, { user: user.user.id }]
                          : currentLikes,
                      }
                    }),
                  },
                },
          ),
        )
      }
    } catch (err) {
      console.error(err)
      // Rollback
      setNewsPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: {
                  ...p.comments,
                  docs: p.comments?.docs?.map((c) =>
                    typeof c !== 'number' && c.id === commentId ? originalComment : c,
                  ),
                },
              }
            : p,
        ),
      )
      alert('An error occurred while toggling the like on the comment.')
    } finally {
      setPendingLikes((prev) => {
        const updated = new Set(prev)
        updated.delete(operationKey)
        return updated
      })
    }
  }

  /**
   * Adds a comment locally (optimistic update)
   */
  const handleAddCommentLocally = (
    postId: number,
    commentText: string,
    commentId: number,
    authorId: number,
    authorName: string,
  ) => {
    setNewsPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id !== postId) return p

        const newComment: Comment = {
          id: commentId,
          post: postId, // required field
          comment: commentText,
          author: authorId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          likes: [],
        }

        return {
          ...p,
          comments: {
            ...p.comments,
            docs: [...(p.comments?.docs ?? []), newComment],
          },
        }
      }),
    )
  }

  /**
   * Deletes a comment both on server and locally
   */
  const handleDeleteComment = async (postId: number, userId: number, commentId: number) => {
    try {
      const result = await deleteComment(postId, userId, commentId)

      if (result?.status === 'success') {
        setNewsPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: {
                    ...post.comments,
                    docs: (post.comments?.docs ?? []).filter(
                      (c) => typeof c !== 'number' && c.id !== commentId,
                    ),
                  },
                }
              : post,
          ),
        )
      } else {
        console.error('Failed to delete comment:', result?.message)
        alert(result?.message || 'Failed to delete comment.')
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('An error occurred while deleting the comment.')
    }
  }

  /**
   * Formats date strings consistently
   */
  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm',
      }).format(new Date(dateString))
    } catch (error) {
      console.error('Date formatting error:', error)
      return 'Invalid date'
    }
  }

  return {
    newsPosts,
    handleLikePost,
    handleLikeComment,
    isLikeInProgress,
    handleAddCommentLocally,
    handleDeleteComment,
    formatDate,
  }
}

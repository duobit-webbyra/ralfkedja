'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '@/app/providers/getUser'
import { Comment, Likes, Post } from '@/payload-types'

export async function fetchAllComments(id: number): Promise<CommentResponse> {
  if (!id) {
    return { status: 'error', message: 'Post ID is required.' }
  }

  try {
    const payload = await getPayload({ config })

    // Fetch the post with all comments
    const post = await payload.findByID({
      collection: 'posts',
      id: id,
      depth: 1, // Ensure we fetch related data
    })

    if (!post) {
      return { status: 'error', message: 'Post not found.' }
    }

    const comments = post.comments.docs.filter(comment => typeof comment === 'object') ?? []

    return {
      status: 'success',
      data: {
        comments: comments
      },
    }
  } catch (error) {
    console.error('Error fetching all comments:', error)
    return { status: 'error', message: 'Failed to fetch comments. Please try again.' }
  }
}

export async function createComment(
  postId: number,
  commentId: string,
): Promise<{ status: 'success' | 'error'; comment?: Comment }> {

  const user = await getUser()
  if (!user) {
    return { status: 'error' }
  }

  // Validate input
  if (!postId || !commentId) {
    return { status: 'error' }
  }

  if (commentId.trim().length === 0) {
    return { status: 'error' }
  }


  try {
    const payload = await getPayload({ config })
    const post = await payload.findByID({
      collection: 'posts',
      id: postId,
    })

    const newComment = await payload.create(
      {
        collection: 'comments',
        data: {
          author: user,
          comment: commentId,
          post: post.id,
        }
      }
    )

    return {
      status: 'success',
      comment: newComment
    }
  } catch (error) {
    console.error('Failed to save comment:', error)
    return { status: 'error' }
  }
}

export async function deleteComment(
  commentId: number,
): Promise<{ status: 'success' | 'error' }> {

  const user = await getUser()
  // Validate input
  if (!user) {
    return { status: 'error' }
  }

  if (!commentId) {
    return { status: 'error' }
  }

  try {
    // Get authenticated user to verify identity
    const currentUser = await getUser()

    if (!currentUser || currentUser.id !== user.id) {
      return { status: 'error' }
    }

    const payload = await getPayload({ config })
    const comment = await payload.findByID({
      collection: 'comments',
      id: commentId,
    })

    if (typeof comment.author !== 'object') {
      return { status: 'error' }
    }

    const author = comment.author

    if (author.id !== user.id) {
      return { status: 'error' }
    }

    await payload.delete({
      collection: 'comments',
      id: commentId
    })

    return {
      status: 'success',
    }
  } catch (error) {
    console.error('Failed to delete comment:', error)
    return { status: 'error' }
  }
}

// Helper to check if a user has liked something
function hasUserLiked(likes: Likes, userId: number) {
  return (
    likes?.some((like) => {
      const likeUserId = typeof like.user === 'object' ? like.user.id : like.user
      return likeUserId === userId
    }) || false
  )
}

// Server-side post like function
export async function likePost(
  postId: number,
): Promise<{ status: string; post?: Post }> {
  try {
    const user = await getUser()
    if (!user) {
      return { status: 'error' }
    }

    const payload = await getPayload({ config })

    // Fetch the post
    const post = await payload.findByID({
      collection: 'posts',
      id: postId,
    })

    if (!post) {
      return { status: 'error' }
    }

    // Check if user has already liked
    const alreadyLiked = hasUserLiked(post.likes, user.id)

    // Update likes - add or remove based on server check
    let updatedLikes
    if (alreadyLiked) {
      // Remove like
      updatedLikes = post.likes?.filter((like) => {
        const likeUserId = typeof like.user === 'object' ? like.user.id : like.user
        return likeUserId !== user.id
      })
    } else {
      // Add like
      updatedLikes = [...(post.likes || []), { user: user.id }]
    }

    // Update database
    const newPost = await payload.update({
      collection: 'posts',
      id: postId,
      data: { likes: updatedLikes },
    })

    return { status: 'success', post: newPost }
  } catch (error) {
    console.error('Error toggling like on post:', error)
    return { status: 'error' }
  }
}

// Server-side comment like function
export async function likeComment(
  commentId: number,
): Promise<{ status: string; message?: string }> {
  try {
    const payload = await getPayload({ config })

    // Fetch the post
    const comment = await payload.findByID({
      collection: 'comments',
      id: commentId,
    })

    if (!comment) {
      return { status: 'error', message: 'Post not found.' }
    }

    // Find the comment
    // const comment = post.comments?.find((c) => c.id === commentId)
    // if (!comment) {
    //   return { status: 'error', message: 'Comment not found.' }
    // }

    // Check if user has already liked
    // const alreadyLiked = hasUserLiked(comment.likes, userId)

    // Update comments with modified like
    // const updatedComments = (post.comments ?? []).map((c) => {
    //   if (c.id === commentId) {
    //     let updatedLikes
    //     if (alreadyLiked) {
    //       // Remove like
    //       updatedLikes = c.likes?.filter((like) => {
    //         const likeUserId = typeof like.user === 'object' ? like.user.id : like.user
    //         return likeUserId !== userId
    //       })
    //     } else {
    //       // Add like
    //       updatedLikes = [...(c.likes || []), { user: userId }]
    //     }
    //     return { ...c, likes: updatedLikes }
    //   }
    //   return c
    // })

    // Update database
    // await payload.update({
    //   collection: 'posts',
    //   id: postId,
    //   data: { comments: updatedComments },
    // })

    return { status: 'success' }
  } catch (error) {
    console.error('Error toggling like on comment:', error)
    return { status: 'error', message: 'Failed to toggle like on comment.' }
  }
}

'use server'

import { APIError, APIErrorName, getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '@/app/providers/getUser'
import { Comment, Likes, Post } from '@/payload-types'
import { ApiError } from 'next/dist/server/api-utils'

type CommentResponse =
  | { status: 'success'; data: { comments: Comment[] } }
  | { status: 'error'; message: string }

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

    const comments = post.comments.docs.filter((comment) => typeof comment === 'object') ?? []

    return {
      status: 'success',
      data: {
        comments: comments,
      },
    }
  } catch (error) {
    console.error('Error fetching all comments:', error)
    return { status: 'error', message: 'Failed to fetch comments. Please try again.' }
  }
}

export async function createComment(
  postId: number,
  commentText: string,
): Promise<{ status: 'success' | 'error'; comment?: Comment }> {
  const user = await getUser()
  if (!user) {
    return { status: 'error' }
  }

  // Validate input
  if (!postId || !commentText) {
    return { status: 'error' }
  }

  if (commentText.trim().length === 0) {
    return { status: 'error' }
  }

  try {
    const payload = await getPayload({ config })
    const post = await payload.findByID({
      collection: 'posts',
      id: postId,
    })

    const newComment = await payload.create({
      collection: 'comments',
      data: {
        author: user,
        comment: commentText,
        post: post.id,
      },
    })

    return {
      status: 'success',
      comment: newComment,
    }
  } catch (error) {
    console.error('Failed to save comment:', error)
    return { status: 'error' }
  }
}

export async function deleteComment(commentId: number): Promise<{ status: 'success' }> {
  const user = await getUser()
  // Validate input
  if (!user) {
    throw new Error('User not found')
  }

  if (!commentId) {
    throw new Error('Comment ID is required')
  }

  try {
    const payload = await getPayload({ config })
    const comment = await payload.findByID({
      collection: 'comments',
      id: commentId,
    })

    if (typeof comment.author !== 'object') {
      throw new Error('Invalid comment author')
    }

    const author = comment.author

    if (author.id !== user.id) {
      throw new Error('Unauthorized')
    }

    await payload.delete({
      collection: 'comments',
      id: commentId,
    })

    return {
      status: 'success',
    }
  } catch (error) {
    if (error instanceof APIError) {
      throw new Error('Failed to delete comment')
    } else {
      throw error
    }
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
export async function likePost(postId: number): Promise<{ status: string; post?: Post }> {
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
export async function likeComment(commentId: number): Promise<{ comment: Comment }> {
  try {
    const user = await getUser()

    if (!user) {
      throw new Error('User not found.')
    }

    const payload = await getPayload({ config })

    // Fetch the post
    const comment = await payload.findByID({
      collection: 'comments',
      id: commentId,
    })

    if (!comment) {
      throw new Error('Comment not found.')
    }

    // Check if user has already liked
    const alreadyLiked = hasUserLiked(comment.likes, user.id)

    comment.likes = alreadyLiked
      ? comment.likes.filter((like) => {
          const likeUserId = typeof like.user === 'object' ? like.user.id : like.user
          return likeUserId !== user.id
        })
      : [...(comment.likes || []), { user: user.id }]

    // Update database
    const newComment = await payload.update({
      collection: 'comments',
      id: commentId,
      data: comment,
    })

    return { comment: newComment }
  } catch (error) {
    console.error('Error toggling like on comment:', error)
    throw new Error('Failed to toggle like on comment.')
  }
}

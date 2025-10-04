'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { createComment, deleteComment, likeComment, likePost } from './send_comment'
import { Comment, Post, User } from '@/payload-types'
import { Form, TextAreaNew } from '../Form'
import { v4 as uuidv4 } from 'uuid'
import { IoSend } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import Heart from '../graphics/heart'
import { useAuth } from '@/app/providers/auth'
import { formatDate } from '@/app/utils/formatDate'

interface NewsClientProps {
  initialPosts: Post[]
  sliceList?: boolean
}

const Comments = React.memo(({ post, initialComments }: { post: number, initialComments: Comment[] }) => {

  const [comments, setComments] = useState(initialComments.reduce((acc, comment) => {
    if (typeof comment === 'object') {
      acc[comment.id] = comment
    }
    return acc
  }, {} as Record<number, Comment>))

  const { user } = useAuth()

  const handleCreateComment = async (content: string) => {
    try {
      const result = await createComment(post, content)

      if (result.status !== 'success') {
      } else {
        setComments((prevComments) => ({
          ...prevComments,
          [result.comment.id]: result.comment,
        }))
      }
    } catch (error) {
      console.error('Error creating comment:', error)
      alert('An error occurred while creating the comment.')
    }
  }

  const handleDeleteComment = async (comment: number) => {
    try {
      const result = await deleteComment(comment)

      if (result?.status === 'success') {
        // setNewsPosts((prevPosts) =>
        //   prevPosts.map((post) =>
        //     post.id === postId
        //       ? {
        //         ...post,
        //         comments: (post.comments ?? []).filter((comment) => comment.id !== commentId),
        //       }
        //       : post,
        //   ),
        // )
      } else {
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('An error occurred while deleting the comment.')
    }
  }

  const handleLikeComment = async (comment: number) => {

  }

  return (
    <>
      <ul className="mt-2 space-y-2">
        {Object.values(comments).map((comment) => {

          let author: User

          console.log(comment)

          if (typeof comment.author === 'object') {
            author = comment.author
          } else {
            return null
          }

          return (
            <li key={comment.id} className="bg-tertiary-200 py-2 pl-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-2 wrap-break-word" style={{ overflowWrap: 'anywhere' }}>
                    {comment.comment}
                  </p>
                  <p className="text-xs! text-gray-500!">
                    {comment.author.name} • {formatDate(comment.createdAt)}
                  </p>
                </div>
                <div className="flex  gap-2 justify-start">
                  {user.id === comment.author.id && (
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        // setIsModalOpen(true)
                        // setTargetComment({ postId: post.id, commentId: comment.id })
                      }}
                      aria-label="Delete comment"
                    >
                      <MdDeleteOutline size={20} color="#424847" />
                    </button>
                  )}
                  <div className="flex  gap-1">
                    <button
                      className="text-primary-500 cursor-pointer"
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <Heart
                        filled={comment.likes?.some(
                          (like) => like.user === user.id, // Check if the user has liked the comment
                        )}
                      />
                    </button>
                    <p className="w-10">{comment.likes?.length || 0}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <Form
        className="mt-4 outline-none flex focus-within:border-2 focus-within:border-tertiary bg-[#F5F5F5] border rounded items-end"
        action={async (formData) => {
          try {
            // Get the comment text for optimistic UI update
            const commentText = formData.get('comment')?.toString() || ''
            await handleCreateComment(commentText)

          } catch (error) {
            console.error('Error saving comment:', error)
          }
        }}
      >
        <TextAreaNew
          name="comment"
          placeholder="Skriv en kommentar..."
          className="px-5 py-4"
          maxLength={1000}
          required
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault() // Prevent adding a new line
              e.currentTarget.form?.requestSubmit() // Programmatically submit the form
            }
          }}
        />
        <button
          type="submit"
          className="cursor-pointer px-2 py-2 flex items-end"
          aria-label="Send comment"
        >
          <IoSend size={20} color="#424847" />
        </button>
      </Form>
    </>
  );
})

function PostView({
  initialPost
}: {
  initialPost: Post
}) {

  const [post, setPost] = useState<Post | null>(initialPost)

  const [comments, setComments] = useState<{ [key: number]: Comment }>(
    initialPost.comments?.docs
      ?.filter(comment => typeof comment === 'object')
      .reduce((acc, comment) => {
        acc[comment.id] = comment;
        return acc;
      }, {} as { [key: number]: Comment }) ?? {}
  )

  if (!post) return null

  const { user } = useAuth()

  const handleLikePost = async () => {
    const alreadyLiked = post.likes?.some((like) => {
      return like.user === user.id
    })

    // Call the server action to update the database
    try {
      const result = await likePost(post.id)

      if (result.status !== 'success') {
      } else {
        setPost(result.post)
      }
    } catch (error) {
      console.error('Error toggling like on post:', error)
      alert('An error occurred while toggling the like on the post.')
    }
  }




  return (
    <div
      key={post.id}
      className="bg-tertiary-100 p-4 md:p-6 rounded-lg shadow-md flex flex-col"
    >
      <div className="mb-6">
        <h2
          className="text-[1.5rem]! md:text-[2rem]! wrap-break-word"
          style={{ overflowWrap: 'anywhere' }}
        >
          {post.title}
        </h2>
        <p className="text-xs! text-gray-500!">
          Ralf Kedja • Publicerad {formatDate(post.createdAt || new Date().toISOString())}
        </p>
        <p className="my-4 wrap-break-word" style={{ overflowWrap: 'anywhere' }}>
          {post.content}
        </p>

        <div className="flex items-center gap-1">
          <button
            className="text-primary-500 cursor-pointer"
            onClick={() => handleLikePost()}
          >
            <Heart
              filled={
                post.likes?.some(
                  (like) => typeof (like.user) === 'object' && like.user.id === user.id, // Check if the user has liked the post
                )
              }
            />
          </button>
          <p>{post.likes?.length || 0}</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold">Kommentarer:</h3>
      <Comments post={initialPost.id} initialComments={initialPost.comments?.docs?.filter(comment => typeof comment === 'object') ?? []} />
    </div>
  )

}


function NewsClient({ initialPosts, sliceList }: NewsClientProps) {

  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [targetComment, setTargetComment] = useState<{ postId: string; commentId: string } | null>(
    null,
  )

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }

    // Cleanup when the component unmounts
    return () => { }
  }, [isModalOpen])

  return (
    <>
      {isModalOpen && targetComment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-2 rounded-lg shadow-lg md:w-120 w-80 flex flex-col gap-4 py-6 px-8">
            <div className="p-2">
              <h2 className="text-sm! mb-2">Radera kommentar?</h2>
              <p className=" mb-2">Är du säker på att du vill radera din kommentar?</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-primary-300 flex-1 text-white px-4 py-2 rounded hover:bg-primary-200 cursor-pointer"
                onClick={() => {
                  // handleDeleteComment(targetComment.postId, user.id, targetComment.commentId)
                  setIsModalOpen(false)
                }}
              >
                Radera
              </button>
              <button
                className="bg-gray-300 text-black flex-1 px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Ångra
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="">
        {sliceList ? (
          <>
            <h1 className="text-[1.5rem]! md:text-3xl!">Nyheter</h1>
            <p>Läs de senaste nyheter och uppdateringar!</p>
          </>
        ) : (
          <h1 className="text-center mb-8">Alla nyheter</h1>
        )}
      </div>
      <div className="flex flex-col gap-16">
        {posts.map((post) => (
          <PostView key={post.id} initialPost={post} />
        ))}
      </div>
    </>
  )
}

export default NewsClient

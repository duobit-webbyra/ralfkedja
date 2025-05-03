'use client';
import React, { useState } from 'react';
import { saveComment, deleteComment, likeComment, likePost } from './send_comment';
import { User } from '@/payload-types';
import { Form, TextAreaNew } from '../Form';
import { v4 as uuidv4 } from 'uuid';
import { IoSend } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';

interface NewsClientProps {
  newsPosts: ClientNews[];
  user: {
    user: {
      id: string;
      name: string;
      role: string;
    };
  };
}

export interface ClientNews {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  likes?: {
    user: string;
  }[];
  comments: {
    id: string;
    comment: string;
    author: {
      id: string;
      name: string;
    };
    createdAt: string;
    likes?: {
      user: string;
    }[];
  }[];
}

function NewsClient({ newsPosts: initialNewsPosts, user }: NewsClientProps) {
  const [newsPosts, setNewsPosts] = useState<ClientNews[]>(initialNewsPosts);

  const handleLikePost = async (postId: string) => {
    // Get the current post
    const post = newsPosts.find((post) => post.id === postId);

    if (!post) {
      console.error('Post not found');
      return;
    }

    // Check if user has liked this post in the current client state
    // This is just for optimistic UI update and will be re-verified on the server
    const clientSideAlreadyLiked = post.likes?.some((like) => {
      const likeUserId = typeof like.user === 'string' ? like.user : like.user.id;
      return likeUserId === user.user.id;
    });

    // Optimistically update the UI
    setNewsPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: clientSideAlreadyLiked
                ? post.likes?.filter((like) => {
                    const likeUserId = typeof like.user === 'string' ? like.user : like.user.id;
                    return likeUserId !== user.user.id;
                  }) // Remove like
                : [...(post.likes || []), { user: user.user.id }], // Add like
            }
          : post,
      ),
    );

    // Call the server action to update the database
    // We no longer pass the alreadyLiked flag - server will determine this
    try {
      const result = await likePost(postId, user.user.id);

      if (result.status !== 'success') {
        console.error('Failed to toggle like on post:', result.message);
        alert(result.message || 'Failed to toggle like on post.');

        // Rollback the optimistic update if the server action fails
        setNewsPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: clientSideAlreadyLiked
                    ? [...(post.likes || []), { user: user.user.id }] // Re-add like
                    : post.likes?.filter((like) => {
                        const likeUserId = typeof like.user === 'string' ? like.user : like.user.id;
                        return likeUserId !== user.user.id;
                      }), // Remove like
                }
              : post,
          ),
        );
      } else if (clientSideAlreadyLiked !== !result.wasLiked) {
        // If our client prediction was wrong (server found a different like state),
        // update to match server state
        setNewsPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: result.wasLiked
                    ? [
                        ...(post.likes || []).filter((like) => {
                          const likeUserId =
                            typeof like.user === 'string' ? like.user : like.user.id;
                          return likeUserId !== user.user.id;
                        }),
                        { user: user.user.id },
                      ] // Ensure like is added
                    : post.likes?.filter((like) => {
                        const likeUserId = typeof like.user === 'string' ? like.user : like.user.id;
                        return likeUserId !== user.user.id;
                      }), // Ensure like is removed
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.error('Error toggling like on post:', error);
      alert('An error occurred while toggling the like on the post.');

      // Rollback optimistic update on error
      setNewsPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: clientSideAlreadyLiked
                  ? [...(post.likes || []), { user: user.user.id }] // Re-add like
                  : post.likes?.filter((like) => {
                      const likeUserId = typeof like.user === 'string' ? like.user : like.user.id;
                      return likeUserId !== user.user.id;
                    }), // Remove like
              }
            : post,
        ),
      );
    }
  };

  const handleLikeComment = async (postId: string, commentId: string) => {
    const alreadyLiked = newsPosts
      .find((post) => post.id === postId)
      ?.comments.find((comment) => comment.id === commentId)
      ?.likes?.some((like) => like.user === user.user.id);

    // Optimistically update the UI
    setNewsPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      likes: alreadyLiked
                        ? comment.likes?.filter((like) => like.user !== user.user.id) // Remove like
                        : [...(comment.likes || []), { user: user.user.id }], // Add like
                    }
                  : comment,
              ),
            }
          : post,
      ),
    );

    // Call the server action to update the database
    try {
      const result = await likeComment(postId, commentId, user.user.id, alreadyLiked);

      if (result.status !== 'success') {
        console.error('Failed to toggle like on comment:', result.message);
        alert(result.message || 'Failed to toggle like on comment.');

        // Rollback the optimistic update if the server action fails
        setNewsPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.map((comment) =>
                    comment.id === commentId
                      ? {
                          ...comment,
                          likes: alreadyLiked
                            ? [...(comment.likes || []), { user: user.user.id }] // Re-add like
                            : comment.likes?.filter((like) => like.user !== user.user.id), // Remove like
                        }
                      : comment,
                  ),
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.error('Error toggling like on comment:', error);
      alert('An error occurred while toggling the like on the comment.');
    }
  };

  const handleAddCommentLocally = (
    postId: string,
    commentText: string,
    commentId: string,
    authorId: string,
    authorName: string,
  ) => {
    setNewsPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...(post.comments ?? []),
                {
                  id: commentId,
                  comment: commentText, // Fixed: Added the missing comment text
                  author: { id: authorId, name: authorName },
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post,
      ),
    );
  };

  const handleDeleteComment = async (postId: string, userId: string, commentId: string) => {
    try {
      const result = await deleteComment(postId, userId, commentId);

      if (result?.status === 'success') {
        setNewsPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: (post.comments ?? []).filter((comment) => comment.id !== commentId),
                }
              : post,
          ),
        );
      } else {
        console.error('Failed to delete comment:', result?.message);
        alert(result?.message || 'Failed to delete comment.');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('An error occurred while deleting the comment.');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm',
      }).format(new Date(dateString));
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  return (
    <>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Nyheter</h1>
        <p>Läs de senaste nyheter och uppdateringar!</p>
      </div>
      <div className='flex flex-col gap-16'>
        {newsPosts.map((post) => (
          <div key={post.id} className='bg-tertiary-100 p-6 rounded-lg shadow-sm flex flex-col'>
            <h2 className='text-xl font-bold'>{post.title}</h2>
            <p className='text-sm text-gray-500'>
              Ralf Kedja • Publicerad {formatDate(post.createdAt || new Date().toISOString())}
            </p>
            <p className='my-4'>{post.content}</p>
            <div className='mt-4'>
              <button className='text-primary-500' onClick={() => handleLikePost(post.id)}>
                👍 {post.likes?.length || 0} Likes
              </button>
              <h3 className='text-lg font-semibold'>Kommentarer:</h3>
              <ul className='mt-2 space-y-2'>
                {post.comments.map((comment) => (
                  <li key={comment.id} className='bg-tertiary-200 py-2 pl-4 pr-2 rounded-lg'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <p className='mb-2 break-all'>{comment.comment}</p>
                        <p className='text-primary-200 text-xs'>
                          {comment.author.name} • {formatDate(comment.createdAt)}
                        </p>
                      </div>
                      {user.user.id === comment.author.id && (
                        <button
                          className='cursor-pointer'
                          onClick={() => handleDeleteComment(post.id, user.user.id, comment.id)}
                          aria-label='Delete comment'
                        >
                          <MdDeleteOutline size={20} color='#424847' />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <Form
                className='mt-4 flex outline-none focus-within:border-2 focus-within:border-tertiary flex-col gap-2 bg-[#F5F5F5] border rounded items-end'
                action={async (formData) => {
                  try {
                    // Get the comment text for optimistic UI update
                    const commentText = formData.get('comment')?.toString() || '';
                    const commentId = uuidv4();
                    formData.append('commentId', commentId);
                    formData.append('postId', post.id);
                    formData.append('author', user.user.id);

                    // Call server action
                    const result = await saveComment(formData);

                    // Add comment locally for immediate UI update
                    if (!result?.status || result.status !== 'error') {
                      handleAddCommentLocally(
                        post.id,
                        commentText,
                        commentId,
                        user.user.id,
                        user.user.name,
                      );
                    } else {
                      console.error('Failed to save comment:', result.message);
                      alert(result.message || 'Failed to save comment.');
                    }
                  } catch (error) {
                    console.error('Error saving comment:', error);
                    alert('An error occurred while saving the comment.');
                  }
                }}
              >
                <TextAreaNew
                  name='comment'
                  placeholder='Skriv en kommentar...'
                  className='px-5 py-4'
                  required
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault(); // Prevent adding a new line
                      e.currentTarget.form?.requestSubmit(); // Programmatically submit the form
                    }
                  }}
                />
                <button
                  type='submit'
                  className='cursor-pointer px-3 py-3'
                  aria-label='Send comment'
                >
                  <IoSend size={20} color='#424847' />
                </button>
              </Form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsClient;

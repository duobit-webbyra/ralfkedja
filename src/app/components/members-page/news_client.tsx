'use client';
import React, { useState, useEffect } from 'react';
import { saveComment, deleteComment, likeComment, likePost } from './send_comment';
import { User } from '@/payload-types';
import { Form, TextAreaNew } from '../Form';
import { v4 as uuidv4 } from 'uuid';
import { IoSend } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import Heart from '../graphics/heart';

interface NewsClientProps {
  newsPosts: ClientNews[];
  user: {
    user: {
      id: string;
      name: string;
    };
  };
  sliceList?: boolean;
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

function NewsClient({ newsPosts: initialNewsPosts, user, sliceList }: NewsClientProps) {
  const [newsPosts, setNewsPosts] = useState<ClientNews[]>(initialNewsPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetComment, setTargetComment] = useState<{ postId: string; commentId: string } | null>(
    null,
  );

  const handleLikePost = async (postId: string) => {
    // Find the post and check if the user has already liked it
    const post = newsPosts.find((post) => post.id === postId);

    if (!post) {
      console.error('Post not found:', postId);
      return;
    }

    // Check if the user has already liked the post
    const alreadyLiked = post.likes?.some((like) => {
      // Normalize the user ID from the likes array
      return like.user === user.user.id;
    });

    console.log('Post before like:', post);
    console.log('Already liked:', alreadyLiked);

    // Optimistically update the UI
    setNewsPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: alreadyLiked
                ? post.likes?.filter((like) => {
                    return like.user === user.user.id;
                  }) // Remove like
                : [...(post.likes || []), { user: user.user.id }], // Add like
            }
          : post,
      ),
    );

    // Call the server action to update the database
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
                  likes: alreadyLiked
                    ? [...(post.likes || []), { user: user.user.id }] // Re-add like
                    : post.likes?.filter((like) => {
                        return like.user === user.user.id;
                      }), // Remove like
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.error('Error toggling like on post:', error);
      alert('An error occurred while toggling the like on the post.');
    }
  };

  const handleLikeComment = async (postId: string, commentId: string) => {
    // Find the post and comment, and check if the user has already liked the comment
    const post = newsPosts.find((post) => post.id === postId);

    if (!post) {
      console.error('Post not found:', postId);
      return;
    }

    const comment = post.comments.find((comment) => comment.id === commentId);

    if (!comment) {
      console.error('Comment not found:', commentId);
      return;
    }

    const alreadyLiked = comment.likes?.some((like) => {
      return like.user === user.user.id;
    });

    console.log('Comment before like:', comment);
    console.log('Already liked:', alreadyLiked);

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
                        ? comment.likes?.filter((like) => {
                            return like.user === user.user.id;
                          }) // Remove like
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
      const result = await likeComment(postId, commentId, user.user.id);

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
                            : comment.likes?.filter((like) => {
                                return like.user === user.user.id;
                              }), // Remove like
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }

    // Cleanup when the component unmounts
    return () => {};
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && targetComment && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
          <div className='bg-white p-2 rounded-lg shadow-lg md:w-120 w-80 flex flex-col gap-4 py-6 px-8'>
            <div className='p-2'>
              <h2 className='text-sm! mb-2'>Radera kommentar?</h2>
              <p className=' mb-2'>Är du säker på att du vill radera din kommentar?</p>
            </div>
            <div className='flex gap-2'>
              <button
                className='bg-primary-300 flex-1 text-white px-4 py-2 rounded hover:bg-primary-200 cursor-pointer'
                onClick={() => {
                  handleDeleteComment(targetComment.postId, user.user.id, targetComment.commentId);
                  setIsModalOpen(false);
                }}
              >
                Radera
              </button>
              <button
                className='bg-gray-300 text-black flex-1 px-4 py-2 rounded hover:bg-gray-200 cursor-pointer'
                onClick={() => setIsModalOpen(false)}
              >
                Ångra
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=''>
        {sliceList ? (
          <>
            <h1 className='text-[1.5rem]! md:text-3xl!'>Nyheter</h1>
            <p>Läs de senaste nyheter och uppdateringar!</p>
          </>
        ) : (
          <h1 className='text-center mb-8'>Alla nyheter</h1>
        )}
      </div>
      <div className='flex flex-col gap-16'>
        {newsPosts.map((post) => (
          <div
            key={post.id}
            className='bg-tertiary-100 p-4 md:p-6 rounded-lg shadow-md flex flex-col'
          >
            <div className='mb-6'>
              <h2 className='text-[1.5rem]! md:text-[2rem]! break-all'>{post.title}</h2>
              <p className='text-xs! text-gray-500!'>
                Ralf Kedja • Publicerad {formatDate(post.createdAt || new Date().toISOString())}
              </p>
              <p className='my-4 break-all'>{post.content}</p>

              <div className='flex items-center gap-1'>
                <button
                  className='text-primary-500 cursor-pointer'
                  onClick={() => handleLikePost(post.id)}
                >
                  <Heart
                    filled={post.likes?.some(
                      (like) => like.user === user.user.id, // Check if the user has liked the post
                    )}
                  />
                </button>
                <p>{post.likes?.length || 0}</p>
              </div>
            </div>
            <h3 className='text-lg font-semibold'>Kommentarer:</h3>
            <ul className='mt-2 space-y-2'>
              {post.comments.map((comment) => (
                <li key={comment.id} className='bg-tertiary-200 py-2 pl-4 rounded-lg'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='mb-2 break-all'>{comment.comment}</p>
                      <p className='text-xs! text-gray-500!'>
                        {comment.author.name} • {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    <div className='flex  gap-2 justify-start'>
                      {user.user.id === comment.author.id && (
                        <button
                          className='cursor-pointer'
                          onClick={() => {
                            setIsModalOpen(true);
                            setTargetComment({ postId: post.id, commentId: comment.id });
                          }}
                          aria-label='Delete comment'
                        >
                          <MdDeleteOutline size={20} color='#424847' />
                        </button>
                      )}
                      <div className='flex  gap-1'>
                        <button
                          className='text-primary-500 cursor-pointer'
                          onClick={() => handleLikeComment(post.id, comment.id)}
                        >
                          <Heart
                            filled={comment.likes?.some(
                              (like) => like.user === user.user.id, // Check if the user has liked the comment
                            )}
                          />
                        </button>
                        <p className='w-10'>{comment.likes?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Form
              className='mt-4 outline-none flex focus-within:border-2 focus-within:border-tertiary bg-[#F5F5F5] border rounded items-end'
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
                  }
                } catch (error) {
                  console.error('Error saving comment:', error);
                }
              }}
            >
              <TextAreaNew
                name='comment'
                placeholder='Skriv en kommentar...'
                className='px-5 py-4'
                maxLength={1000}
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
                className='cursor-pointer px-2 py-2 flex items-end'
                aria-label='Send comment'
              >
                <IoSend size={20} color='#424847' />
              </button>
            </Form>
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsClient;

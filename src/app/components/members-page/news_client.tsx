'use client';
import React, { useState } from 'react';
import { saveComment, deleteComment } from './send_comment'; // Import your server action
import { News, User } from '@/payload-types';
import { Form, Input } from '../Form';
interface NewsClientProps {
  newsPosts: News[];
  user: User;
}

function NewsClient({ newsPosts: initialNewsPosts, user }: NewsClientProps) {
  const [newsPosts, setNewsPosts] = useState<News[]>(initialNewsPosts);

  const handleAddCommentLocally = (postId: string, comment: string, author: string) => {
    setNewsPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...(post.comments ?? []), // Default to an empty array if comments is null or undefined
                {
                  comment,
                  author,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post,
      ),
    );
  };

  const DeleteCommentLocal = async (postId: string, userId: string, commentId: string) => {
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
      alert(result?.message || 'Failed to delete comment.');
    }
  };

  return (
    <div className='flex flex-col gap-6  '>
      <h1 className='text-2xl font-bold py-4'>Nyheter</h1>
      {newsPosts.map((post) => (
        <div key={post.id} className='bg-gray-100 p-6 rounded-lg shadow-md flex flex-col'>
          <h2 className='text-xl font-bold'>{post.title}</h2>
          <p className='text-sm text-gray-500!'>
            Ralf Kedja • {new Date(post.createdAt ?? new Date().toISOString()).toLocaleDateString()}
          </p>
          <p className='text-gray-700! my-4'>{post.content}</p>
          <div className='mt-4'>
            <h3 className='text-lg font-semibold'>Kommentarer</h3>
            <ul className='mt-2 space-y-2'>
              {(post.comments ?? []).map(
                (comment, index) => (
                  console.log(comment),
                  (
                    <li key={index} className='bg-tertiary-200 py-2 px-4 rounded-lg  '>
                      <div className='flex justify-between items-center'>
                        <div>
                          <p>{comment.comment}</p>
                          <p className=' text-primary-200! text-xs!'>
                            {comment.author} •{' '}
                            {new Date(
                              comment.createdAt ?? new Date().toISOString(),
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        {user.user.name === comment.author && (
                          <button
                            onClick={() => DeleteCommentLocal(post.id, user.user.id, comment.id)}
                          >
                            <p>x</p>
                          </button>
                        )}
                      </div>
                    </li>
                  )
                ),
              )}
            </ul>
            <Form
              className='mt-4 flex gap-2'
              action={async (formData) => {
                formData.append('postId', post.id);
                formData.append('author', user.user.name);
                const response = await saveComment(formData);

                if (response.status === 'success' && response.data) {
                  const { postId, comment, author } = response.data;
                  handleAddCommentLocally(postId, comment, author);
                } else {
                  alert('Failed to add comment.');
                }
              }}
            >
              <Input
                type='text'
                name='comment'
                placeholder='Skriv en kommentar...'
                className='flex-1 p-2 border rounded bg-tertiary-100!'
                required
              />
              <button type='submit' className='bg-primary-300 text-white px-4 py-2 rounded'>
                Kommentera
              </button>
            </Form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsClient;

'use client';
import React, { useState } from 'react';
import { saveComment } from './send_comment'; // Import your server action
import { News } from '@/payload-types';
import { Form, Input } from '../Form';
interface NewsClientProps {
  newsPosts: News[]; // Use the News type directly
}

function NewsClient({ newsPosts: initialNewsPosts }: NewsClientProps) {
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

  return (
    <div className='flex flex-col gap-6 py-16'>
      <h1 className='text-2xl font-bold py-4'>Nyheter</h1>
      {newsPosts.map((post) => (
        <div key={post.id} className='bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4'>
          <h2 className='text-xl font-bold'>{post.title}</h2>
          <p className='text-sm text-gray-500'>
            Ralf Kedja • {new Date(post.createdAt ?? new Date().toISOString()).toLocaleDateString()}
          </p>
          <p className='text-gray-700'>{post.content}</p>
          <div className='mt-4'>
            <h3 className='text-lg font-semibold'>Kommentarer</h3>
            <ul className='mt-2 space-y-2'>
              {(post.comments ?? []).map((comment, index) => (
                <li key={index} className='bg-gray-200 p-2 rounded text-gray-800'>
                  <p>{comment.comment}</p>
                  <p className='text-sm text-gray-500'>
                    {comment.author} •{' '}
                    {new Date(comment.createdAt ?? new Date().toISOString()).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
            <Form
              className='mt-4 flex gap-2'
              action={async (formData) => {
                formData.append('postId', post.id); // Add postId programmatically
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
                className='flex-1 p-2 border rounded'
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

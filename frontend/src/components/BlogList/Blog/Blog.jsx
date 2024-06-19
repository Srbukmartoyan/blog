import { mutate } from 'swr';
import { Link } from 'react-router-dom';
import { Button } from '../../Button';
import { ITEMS_PER_PAGE } from '../../../constants';

const Blog = ({ title, author, date, excerpt, postId, showActions, currentPage }) => {
  const handleDeletePost = async () => {
    const token = localStorage.getItem('auth-token');
    try {
      const response = await fetch(`/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'auth-token': token,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      mutate(`/users/my/posts?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
      mutate('/posts');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-4 hover:shadow-lg transitions ease-linear delay-150">
      <Link to={`/blogs/${postId}`} onClick={window.scroll({ top: 0, left: 0, behavior: "smooth" })}>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className='flex items-center gap-1'>
          <p className="text-gray-600 mb-2">Author: {author}</p>
          <div className='bg-gray-300 w-7 h-7 rounded-full relative'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
        </div>
        <p className="text-gray-600 mb-2">Publication Date: {date}</p>
        <p className="text-gray-800">{excerpt}</p>
      </Link>
      {showActions && (
        <>
          <Link to={`/blogs/${postId}/edit`}>
            <Button text='Edit Blog' type='button' />
          </Link>
          <Button text='Delete Blog' type='button' onClick={handleDeletePost} />
        </>
      )}
    </div>
  );
}

export default Blog;

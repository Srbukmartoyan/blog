import useSWR from 'swr';
import { useParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { authFetcher } from '../utils/fetcher';

import Group from '../components/Group';
import { LoadingIndicator, ErrorDisplay } from '../components';
import { INITIAL_CURRENT_PAGE, ITEMS_PER_PAGE } from '../constants';

const FullBlog = () => {
  const token = useAuth();
  const { blogId } = useParams();
  const { data: blogPost, error } = useSWR(`/posts/${blogId}`, authFetcher);
  const authorId = blogPost?.Author?.id;

  const { data: authorPosts, error: authorPostsError } = useSWR(
    authorId ? `/users/${authorId}/posts?page=${INITIAL_CURRENT_PAGE}&limit=${ITEMS_PER_PAGE}` : null,
    authFetcher
  );

  if (error) return <ErrorDisplay />;
  if (!blogPost) return <LoadingIndicator />;
  if (authorPostsError) return <ErrorDisplay message="Failed to load author's posts"/>
  
  return (
    <div className='mx-auto px-8 py-4 bg-slate-200 rounded-md w-full'>
        <div className='w-3/2 md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-md mx-auto my-10 p-9 hover:scale-105 transition ease-linear duration-150'>
          <h2 className='text-xl font-semibold mb-4 text-center'>{blogPost.title}</h2>
          <p className='text-gray-600 mb-2'>Author: {blogPost.Author?.name}</p>
          <p className='text-gray-600 mb-2'>Publication Date: {blogPost.createdAt}</p>
          <p className='text-gray-800'>{blogPost.content}</p>

          {blogPost.Image && (
            <div className="mt-4">
              <img key={blogPost.Image.id} src={blogPost.Image.url} alt={`Image ${blogPost.Image.id}`} className="w-60 h-60 my-2 object-contain mx-auto" />
            </div>
          )}

          <div className="mt-5 flex justify-center flex-wrap">
            {blogPost.Hashtags && blogPost.Hashtags.map(hashtag => (
              <span key={hashtag.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {hashtag.name}
              </span>
            ))}
          </div>
        </div>
        {authorPosts ? (
        <Group posts={authorPosts.posts} title={`More posts by ${blogPost.Author?.name}`} />
      ) : (
        <p>Loading author's posts...</p>
      )}
    </div>
  )
}

export default FullBlog;

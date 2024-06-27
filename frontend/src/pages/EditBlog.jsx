import useSWR from 'swr';
import { useParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { authFetcher } from '../utils/fetcher';

import { BlogForm, ErrorDisplay, LoadingIndicator } from '../components';

const EditBlog = () => {
  const { isAuthChecking } = useAuth()
  const { blogId } = useParams();

  const { data: blogPost, error } = useSWR(`/posts/${blogId}`, authFetcher);
  if (error) return <ErrorDisplay message='Failed to load blog post'/>
  if (!blogPost || isAuthChecking) return <LoadingIndicator />;

  return (
    <div className='w-full h-[92vh] bg-slate-200 flex justify-center items-center'>
      <BlogForm blogPost={blogPost} />
    </div>
  )
}

export default EditBlog

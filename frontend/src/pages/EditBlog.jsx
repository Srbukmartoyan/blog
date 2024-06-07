import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { authFetcher } from '../utils/fetcher';
import { BlogForm } from '../components';
import useAuth from '../hooks/useAuth';

const EditBlog = () => {
  const token = useAuth()
  const { blogId } = useParams();

  const { data: blogPost, error } = useSWR(`/posts/${blogId}`, authFetcher);
  if (error) return <div className='mt-4 text-center text-red-700 font-bold'>Failed to load blog post</div>;
  if (!blogPost) return <div className='mt-4 text-center text-red-700 font-bold'>Loading...</div>;

  return (
    <div className='w-full h-[92vh] bg-slate-200 flex justify-center items-center'>
      <BlogForm blogPost={blogPost} />
    </div>
  )
}

export default EditBlog

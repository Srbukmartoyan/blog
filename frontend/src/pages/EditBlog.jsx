import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { simpleFetcher } from '../utils/fetcher';
import { BlogForm } from '../components';

const EditBlog = () => {
  const { blogId } = useParams();

  const { data: blogPost, error } = useSWR(`/posts/${blogId}`, simpleFetcher);
  if (error) return <div>Failed to load blog post</div>;
  if (!blogPost) return <div>Loading...</div>;

  return (
    <div className='w-full h-[92vh] bg-slate-200 flex justify-center items-center'>
      <BlogForm blogPost={blogPost} />
    </div>
  )
}

export default EditBlog

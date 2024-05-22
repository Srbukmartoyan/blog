import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { BlogForm } from '../components';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const EditBlog = () => {
  const { blogId } = useParams();

  const { data: blogPost, error } = useSWR(`/posts/${blogId}`, fetcher);
  if (error) return <div>Failed to load blog post</div>;
  if (!blogPost) return <div>Loading...</div>;

  return (
    <div className='w-full h-[92vh] bg-blue-100 flex justify-center items-center'>
      <BlogForm blogPost={blogPost} />
    </div>
  )
}

export default EditBlog

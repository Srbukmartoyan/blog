import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogForm } from '../components';

const EditBlog = () => {
  const { blogId } = useParams();
  const [blogPost, setBlogPost] = useState({});
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/posts/${blogId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const post = await response.json();
        setBlogPost(post);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };
    fetchBlogPost();
  }, [blogId]);

  return (
    <div className='w-full h-[92vh] bg-blue-100 flex justify-center items-center'>
      {Object.keys(blogPost).length > 0 && <BlogForm blogPost={blogPost} />}
    </div>
  )
}

export default EditBlog

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/useContext';
import { BlogForm } from '../components';

const EditBlog = () => {
  const { blogId } = useParams();
  // const [blogPost, setBlogPost] = useState({});
  // useEffect(() => {
  //   const fetchBlogPost = async () => {
  //     try {
  //       const response = await fetch(`/posts/${blogId}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch blog post');
  //       }
  //       const post = await response.json();
  //       setBlogPost(post);
  //     } catch (error) {
  //       console.error('Error fetching blog post:', error);
  //     }
  //   };
  //   fetchBlogPost();
  // }, [blogId]);

  return (
    <div>
      <div>
        <h1 className='text-center'>Edit Blog</h1>
        <BlogForm blogPost={blogId} />
      </div>
    </div>
  )
}

export default EditBlog

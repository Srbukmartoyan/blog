import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Group from '../components/Group'

const FullBlog = () => {
  const { blogId } = useParams();
  const [blogPost, setBlogPost] = useState(null);
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
    <div className='mx-auto px-8 py-4 bg-blue-100 rounded-md w-full'>
      {blogPost ? (
        <div className='lg:w-1/3 bg-white shadow-md rounded-md mx-auto my-10 p-9 hover:scale-110 transition ease-linear duration-150'>
          <h2 className='text-xl font-semibold mb-4 text-center'>{blogPost.title}</h2>
          <p className='text-gray-600 mb-2'>Author: {blogPost.Author?.name}</p>
          <p className='text-gray-600 mb-2'>Publication Date: {blogPost.createdAt}</p>
          <p className='text-gray-800'>{blogPost.content}</p>

          {blogPost.Image && (
            <div className="mt-4">
              <img key={blogPost.Image.id} src={blogPost.Image.url} alt={`Image ${blogPost.Image.id}`} className="w-60 h-60 my-2 object-contain mx-auto" />
            </div>
          )}

          <div className="mt-5 flex justify-center">
            {blogPost.Hashtags && blogPost.Hashtags.map(hashtag => (
              <span key={hashtag.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {hashtag.name}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p>Blog post not found!</p>
      )}
      <Group start={0} end={3} title="Most Interesting"/>
    </div>
  )
}

export default FullBlog;

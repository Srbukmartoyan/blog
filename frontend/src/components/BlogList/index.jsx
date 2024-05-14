import React from 'react'
import Blog from './Blog/Blog';

const BlogList = ({posts, title}) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">{title}</h1>
      {posts.map((post, index) => (
        <Blog
          key={index}
          title={post.title}
          author={post.Author.name}
          date={post.createdAt}
          excerpt={post.excerpt}
          id={post.id}
        />
      ))}
    </div>
  );
}

export default BlogList;

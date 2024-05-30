import Blog from './Blog/Blog';

const BlogList = ({posts, title, showActions}) => {
  return (
    <div className="container mx-auto px-8 py-4 bg-slate-200 rounded-md">
      <h1 className="text-3xl font-bold my-8">{title}</h1>
      {posts.map((post, index) => (
        <Blog
          key={index}
          title={post.title}
          author={post.Author?.name}
          date={post.createdAt}
          excerpt={post.excerpt}
          id={post.id}
          showActions={showActions}
        />
      ))}
    </div>
  );
}

export default BlogList;

import Blog from './BlogList/Blog/Blog';

const Group = ({ posts, title }) => {
  return (
    <div className='py-8'>
      <div className='p-4 bg-slate-200 rounded-md'>
        <h2 className='text-2xl text-black-500 font-bold mb-8'>{title}</h2>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {posts.map((post, index) => (
            <Blog
              key={index}
              title={post.title}
              author={post.Author.name}
              date={post.date}
              excerpt={post.excerpt}
              postId={post.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;

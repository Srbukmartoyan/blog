import Blog from './Blog/Blog';
import '../../styles/style.css'

const BlogList = ({ posts, title, showActions }) => {
  return (
    <div className="container mx-auto px-8 py-1 bg-slate-200 rounded-md">
      <div className='flex'>
        <div>
          <h1 className="text-3xl font-bold pt-4">{title}</h1>
          <hr className='highlighted-hr'/>
        </div>
      </div>
      {posts.length == 0 ? <div className='text-xl font-bold text-red-700'>No posts</div> :
        posts.map((post, index) => (
          <Blog
            key={index}
            title={post.title}
            author={post.Author?.name}
            date={post.createdAt}
            excerpt={post.excerpt}
            id={post.id}
            showActions={showActions}
          />
        ))
      }
    </div>
  );
}

export default BlogList;

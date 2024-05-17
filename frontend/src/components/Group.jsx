import Blog from './BlogList/Blog/Blog';
import { useGlobalContext } from '../context/useContext';

const Group = ({ start, end, title }) => {
  const { blogPosts, setBlogPosts } = useGlobalContext();
  const GroupPosts = blogPosts.slice(start, end)

  return (
      <div className=' py-8'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl text-center text-black-500 font-bold mb-8'>{title}</h2>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {GroupPosts.map((post, index) => (
              <Blog
                key={index}
                title={post.title}
                author={post.author}
                date={post.date}
                excerpt={post.excerpt}
                id={post.id}
              />
            ))}
          </div>
        </div>
      </div>
  )
}

export default Group;

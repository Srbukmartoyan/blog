import { useNavigate } from 'react-router-dom';
import { BlogList } from '../components';
import { useAllPosts } from '../hooks/useAllPosts';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const token = useAuth();
  const { allPosts, isLoading, isError } = useAllPosts(); 
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className='mt-4 text-center text-red-700 font-bold'>{isError.message}</div>;

  return (
    <div className='my-8'>
      <BlogList posts={allPosts} title="All Blog Posts" showActions={false} />
    </div>
  );
}

export default Home;
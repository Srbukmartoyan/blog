import { BlogList } from '../components';
import { useAllPosts } from '../hooks/useAllPosts';

const Home = () => {
  const { allPosts, isLoading, isError } = useAllPosts(); 

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts.</div>;

  return (
    <div className='my-8'>
      <BlogList posts={allPosts} title="All Blog Posts" showActions={false} />
    </div>
  );
}

export default Home;
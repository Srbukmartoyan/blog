import { useEffect } from 'react';
import { BlogList } from '../components';
import { useGlobalContext } from '../context/useContext';


const Home = () => {
  const { blogPosts, setBlogPosts } = useGlobalContext();

  const fetchInfo = async () => {
    await fetch('/posts')
    .then((res) => res.json())
    .then((data) => setBlogPosts(data));
  }

  useEffect(() => {
    fetchInfo()
  }, []);

  return (
    <div className='mt-8'>
      <BlogList posts={blogPosts} title="Latest Blog Posts" />
    </div>
  );
}

export default Home;
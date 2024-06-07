import { useState } from 'react';
import { BlogList } from '../components';
import { useAllPosts } from '../hooks/useAllPosts';
import { ITEMS_PER_PAGE } from '../constants';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const token = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const { allPosts, isLoading, isError } = useAllPosts(currentPage, ITEMS_PER_PAGE);

  console.log(allPosts);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className='mt-4 text-center text-red-700 font-bold'>{isError.message}</div>;

  return (
    <div className='my-8'>
      <BlogList posts={allPosts} title="All Blog Posts" showActions={false} />
      <div className="flex justify-center mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 px-4 py-2 bg-slate-200 text-white rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-zinc-700	">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
        <button onClick={nextPage} disabled={allPosts.length < 4} className="ml-2 px-4 py-2 bg-slate-200 text-white rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-zinc-700	">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Home;
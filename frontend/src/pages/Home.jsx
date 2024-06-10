import { useState } from 'react';
import { BlogList } from '../components';
import { useAllPosts } from '../hooks/useAllPosts';
import { ITEMS_PER_PAGE } from '../constants';
import { INITIAL_CURRENT_PAGE } from '../constants';
import useAuth from '../hooks/useAuth';
import usePagination from '../hooks/usePagination';
import PaginationButtons from '../components/PaginationButtons';

const Home = () => {
  const token = useAuth();
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const { allPosts, totalPosts, isLoading, isError } = useAllPosts(currentPage, ITEMS_PER_PAGE);
  const { totalPages, nextPage, prevPage, handlePageClick } = usePagination(totalPosts, ITEMS_PER_PAGE, currentPage, setCurrentPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className='mt-4 text-center text-red-700 font-bold'>{isError.message}</div>;

  return (
    <div className='my-8'>
      <BlogList posts={allPosts} title="All Blog Posts" showActions={false} />
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}

export default Home;
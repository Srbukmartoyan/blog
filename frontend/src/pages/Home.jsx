import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import usePagination from '../hooks/usePagination';
import { useAllPosts } from '../hooks/useAllPosts';

import { BlogList } from '../components';
import PaginationButtons from '../components/PaginationButtons';

import { ITEMS_PER_PAGE, INITIAL_CURRENT_PAGE } from '../constants';

const Home = () => {
  const token = useAuth();
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const { allPosts, totalPosts, isLoading, isError } = useAllPosts(currentPage, ITEMS_PER_PAGE, debouncedSearchTerm);
  const { totalPages, nextPage, prevPage, handlePageClick } = usePagination(totalPosts, ITEMS_PER_PAGE, currentPage, setCurrentPage);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(INITIAL_CURRENT_PAGE); 
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className='mt-4 text-center text-red-700 font-bold'>{isError.message}</div>;

  return (
    <div className='my-8'>
      <input 
        type='text'
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search posts..."
        className="mx-auto mb-4 p-2 border border-gray-300 rounded-md block"
      />
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
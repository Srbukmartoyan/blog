import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import usePagination from '../hooks/usePagination';
import useSearch from '../hooks/useSearch';
import { useAllPosts } from '../hooks/useAllPosts';

import { BlogList } from '../components';
import PaginationButtons from '../components/PaginationButtons';
import SearchInput from '../components/SearchInput';
import HashtagFilter from '../components/HashtagFilter';

import { ITEMS_PER_PAGE, INITIAL_CURRENT_PAGE } from '../constants';

const Home = () => {
  const token = useAuth();
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const handleSearchTermChange = () => {
    setCurrentPage(INITIAL_CURRENT_PAGE);
  };

  const handleHashtagChange = (newHashtags) => {
    setSelectedHashtags(newHashtags);
    setCurrentPage(INITIAL_CURRENT_PAGE);
  };

  const { searchTerm, debouncedSearchTerm, handleSearchChange } = useSearch("", handleSearchTermChange);
  const { allPosts, totalPosts, isLoading, isError } = useAllPosts(currentPage, ITEMS_PER_PAGE, debouncedSearchTerm, selectedHashtags);
  const { totalPages, nextPage, prevPage, handlePageClick } = usePagination(totalPosts, ITEMS_PER_PAGE, currentPage, setCurrentPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className='mt-4 text-center text-red-700 font-bold'>{isError.message}</div>;

  return (
    <div className='my-8'>
      <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} placeholder="Search Posts..."/>
      <HashtagFilter selectedHashtags={selectedHashtags} handleHashtagChange={handleHashtagChange} />
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
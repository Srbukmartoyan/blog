import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import usePagination from '../hooks/usePagination';
import useSearch from '../hooks/useSearch';
import { useAllPosts } from '../hooks/useAllPosts';

import { BlogList, PaginationButtons, SearchInput, HashtagFilter, ErrorDisplay, LoadingIndicator } from '../components';

import { ITEMS_PER_PAGE, INITIAL_CURRENT_PAGE } from '../constants';

const Home = () => {
  const { isAuthChecking } = useAuth();
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

  if (isLoading || isAuthChecking) return <LoadingIndicator />;
  if (isError) return <ErrorDisplay />;

  return (
    <div className='my-8'>
      <div className='flex items-center justify-around flex-wrap'>
        <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} placeholder="Search Posts..." />
        <HashtagFilter selectedHashtags={selectedHashtags} handleHashtagChange={handleHashtagChange} />
      </div>
      <BlogList posts={allPosts} title="All Blog Posts" showActions={false} />
      {totalPages > 0 && <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
        nextPage={nextPage}
        prevPage={prevPage}
      />}
    </div>
  );
}

export default Home;
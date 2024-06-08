import { useState } from 'react';
import { BlogList } from '../components';
import { useAllPosts } from '../hooks/useAllPosts';
import { ITEMS_PER_PAGE } from '../constants';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const token = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const { allPosts, totalPosts, isLoading, isError } = useAllPosts(currentPage, ITEMS_PER_PAGE);

  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const startPage = 1;
    const endPage = totalPages;
    const maxButtons = 5; // Maximum number of buttons to show before the last page

    if (totalPages <= maxButtons + 1) { // maxbuttons == 5 totalpages ==6 => ... do not need
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = startPage; i <= maxButtons; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
          >
            {i}
          </button>
        );
      }

      buttons.push(<span key="ellipsis" className="mx-1">...</span>);

      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`mx-1 px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className='mt-4 text-center text-red-700 font-bold'>{isError.message}</div>;

  return (
    <div className='my-8'>
      <BlogList posts={allPosts} title="All Blog Posts" showActions={false} />
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-zinc-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {renderPaginationButtons()}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="ml-2 px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-zinc-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <span className="ml-4 text-xl font-semibold">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}

export default Home;
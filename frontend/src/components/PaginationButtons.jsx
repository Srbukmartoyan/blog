import { MAX_BUTTONS } from "../constants";

const PaginationButtons = ({ currentPage, totalPages, handlePageClick, nextPage, prevPage }) => {
  const renderButtons = () => {
    const buttons = [];
    const startPage = 1;

    if (totalPages <= MAX_BUTTONS + 1) {
      for (let i = startPage; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-0.5 px-1.5 py-0.5 sm:mx-1 sm:px-3 sm:py-1 rounded-md ${currentPage === i ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = startPage; i <= MAX_BUTTONS; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-0.5 px-1.5 py-0.5 sm:mx-1 sm:px-3 sm:py-1 rounded-md ${currentPage === i ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
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
          className={`mx-0.5 px-1.5 py-0.5 sm:mx-1 sm:px-3 sm:py-1 rounded-md ${currentPage === totalPages ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center mt-4 flex-wrap">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="mr-0.5 px-0.5 py-0.5 md:mr-2 md:px-4 md:py-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-zinc-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {renderButtons()}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="ml-0.5 px-0.5 py-0.5 md:ml-2 md:px-4 md:py-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-zinc-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <span className="ml-4 text-xl font-semibold">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default PaginationButtons;

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
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
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

  return (
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
      {renderButtons()}
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
  );
};

export default PaginationButtons;

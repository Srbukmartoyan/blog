const usePagination = (totalItems, itemsPerPage, currentPage, setCurrentPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return {
    totalPages,
    nextPage,
    prevPage,
    handlePageClick,
  };
};

export default usePagination;

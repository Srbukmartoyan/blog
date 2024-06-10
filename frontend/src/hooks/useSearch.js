import { useState, useEffect } from 'react';

const useSearch = (initialTerm = "", onSearchTermChange) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (onSearchTermChange) {
        onSearchTermChange(searchTerm);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return { searchTerm, debouncedSearchTerm, handleSearchChange, setSearchTerm };
};

export default useSearch;

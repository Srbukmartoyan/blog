import { createContext, useContext } from "react";
import useSearch from "../hooks/useSearch";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const search = useSearch();

    return (
        <SearchContext.Provider value={search}>
            {children}
        </SearchContext.Provider>
    )
}
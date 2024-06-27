import useSWR from "swr";

import useAuth from "../hooks/useAuth";
import { SearchProvider, useSearchContext } from "../context/SearchContext";
import { authFetcher } from "../utils/fetcher";

import {SearchInput, UserList, ErrorDisplay, LoadingIndicator} from "../components";

const AllUsersContent = () => {
    const { isAuthChecking } = useAuth();
    const { searchTerm, debouncedSearchTerm, handleSearchChange } = useSearchContext();
    const { data, error } = useSWR(`/users?search=${debouncedSearchTerm}`, authFetcher);

    const loggedInUser = JSON.parse(localStorage.getItem('authUser'));

    if (error) return <ErrorDisplay  message="Error fetching users"/>
    if ((!data && !error) || isAuthChecking) return <LoadingIndicator />

    const filteredUsers = data.filter(user => user.id !== loggedInUser.id);
    return (
        <div className="mt-8">
            <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} placeholder="Search Users..."/>
            <UserList users={filteredUsers} title='All Users' />
        </div>
    )
}

const AllUsers = () => (
    <SearchProvider>
        <AllUsersContent />
    </SearchProvider>
)
export default AllUsers;
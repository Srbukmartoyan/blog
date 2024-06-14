import useSWR from "swr";

import useAuth from "../hooks/useAuth";
import useSearch from "../hooks/useSearch";
import { authFetcher } from "../utils/fetcher";

import {SearchInput, UserList} from "../components"

const AllUsers = () => {
    const token = useAuth();
    const { searchTerm, debouncedSearchTerm, handleSearchChange } = useSearch();
    const { data, error } = useSWR(`/users?search=${debouncedSearchTerm}`, authFetcher);

    const loggedInUser = JSON.parse(localStorage.getItem('authUser'));

    if (error) return <div className="mt-4 text-center text-red-700 font-bold">Error fetching users</div>
    if (!data && !error) return <div className="mt-4 text-center text-red-700 font-bold">Loading...</div>

    const filteredUsers = data.filter(user => user.id !== loggedInUser.id);
    return (
        <div className="mt-8">
            <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} placeholder="Search Users..."/>
            <UserList users={filteredUsers} title='All Users' />
        </div>
    )
}

export default AllUsers;
import useSWR from "swr";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { authFetcher } from "../utils/fetcher";
import UserList from "../components/UserList";

const AllUsers = () => {
    const token = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const { data, error } = useSWR(`/users?search=${debouncedSearchTerm}`, authFetcher);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const loggedInUser = JSON.parse(localStorage.getItem('authUser'));

    if (error) return <div className="mt-4 text-center text-red-700 font-bold">Error fetching users</div>
    if (!data && !error) return <div className="mt-4 text-center text-red-700 font-bold">Loading...</div>

    const filteredUsers = data.filter(user => user.id !== loggedInUser.id);
    return (
        <div>
            <div className='flex justify-center my-8'>
                <div className='flex items-center gap-2 border border-gray-300 rounded-md p-2'>
                    <div className='text-gray-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search a user..."
                        className="outline-none"
                    />
                </div>
            </div>
            <UserList users={filteredUsers} title='All Users' />
        </div>
    )
}

export default AllUsers;
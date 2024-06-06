import useSWR from "swr";
import useAuth from "../hooks/useAuth";
import { authFetcher } from "../utils/fetcher";
import UserList from "../components/UserList";

const AllUsers = () => {
    const token = useAuth();
    const { data, error } = useSWR('/users', authFetcher);

    const loggedInUser = JSON.parse(localStorage.getItem('authUser'));

    if (error) return <div className="mt-4 text-center text-red-700 font-bold">Error fetching users</div>
    if (!data && !error) return <div className="mt-4 text-center text-red-700 font-bold">Loading...</div>

    const filteredUsers = data.filter(user => user.id !== loggedInUser.id);
    return (
        <div>
            <UserList users={filteredUsers} title='All Users'/>
        </div>
    )
}

export default AllUsers;
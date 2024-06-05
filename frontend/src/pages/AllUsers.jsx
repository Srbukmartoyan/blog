import useSWR from "swr";
import { simpleFetcher } from "../utils/fetcher";
import UserList from "../components/UserList";

const AllUsers = () => {
    const { data, error } = useSWR('/users', simpleFetcher);

    if (error) return <div className="mt-4 text-center text-red-700 font-bold">Error fetching users</div>
    if (!data && !error) return <div className="mt-4 text-center text-red-700 font-bold">Loading...</div>

    return (
        <div>
            <UserList users={data} title='All Users' showAction={true}/>
        </div>
    )
}

export default AllUsers;
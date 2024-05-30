import useSWR from "swr";
import UserList from "../components/UserList";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const AllUsers = () => {
    const { data, error } = useSWR('/users', fetcher);

    if (error) return <div className="mt-4 text-center text-red-700 font-bold">Error fetching users</div>
    if (!data && !error) return <div className="mt-4 text-center text-red-700 font-bold">Loading...</div>

    return (
        <div>
            <UserList users={data} title='All Users' showAction={true}/>
        </div>
    )
}

export default AllUsers;
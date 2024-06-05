import ProfileCard from "../ProfileCard";
import { authFetcher } from "../../utils/fetcher";
import useSWR from "swr";

const UserList = ({users, title}) => {
    const { data, error } = useSWR('/users/profile', authFetcher);

    if (!data && !error) return <div>loading...</div>
    if (error) return <div className='mt-4 text-center text-red-700 font-bold'>{error.message}</div>;
   
    const filteredUsers = users.filter((user) => user.id !== data.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">{title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUsers.map((user, index) => {
               return <ProfileCard 
                        key={index}
                        user={user}
                    />
            })}
            </div>
        </div>
    )
}

export default UserList;
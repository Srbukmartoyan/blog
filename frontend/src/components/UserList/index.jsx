import ProfileCard from "../ProfileCard";
import { authFetcher } from "../../utils/fetcher";
import useSWR from "swr";

const UserList = ({users, title}) => {
    console.log(users);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">{title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user, index) => {
               return <ProfileCard 
                        key={index}
                        user={user}
                        showAction={true}
                    />
            })}
            </div>
        </div>
    )
}

export default UserList;
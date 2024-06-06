import useSWR, { mutate } from "swr";
import { Link } from "react-router-dom";
import { authFetcher } from "../utils/fetcher";
import { Button } from "./Button";

const ProfileCard = ({ user, showAction }) => {
    const status = user.receivedRequests[0]?.status;

    const handleFriendRequest = async (requestType, method) => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch(`/friendRequest/${requestType}`, {
                method,
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipientId: user.id }),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${requestType === 'send' ? 'send' : 'unsend'} friend request`);
            }

            if (requestType === 'send') {
                const data = await response.json();
                console.log('Friend request sent:', data);
            } else {
                console.log('Friend request deleted');
            }

            mutate(`/users`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    const setButtonText = () => {
        if ((!status) || status === 'rejected') {
            return 'Follow';
        } else if (status === 'accepted') {
            return 'Following';
        } else {
            return 'Requested';
        }
    }

    return (
        <div className="shadow-md rounded-md p-6 my-4 bg-slate-100 hover:shadow-lg transition ease-linear delay-150 mx-auto">
            <Link to={`/user/${user.id}`}>
                <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-400 flex-shrink-0">
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>
            </Link>
            {showAction && (
                <>
                    <Button text={setButtonText()} type='button' onClick={() => handleFriendRequest('send', 'POST')} />
                    {status == 'pending' ? <Button text='Delete Request' type='button' onClick={() => handleFriendRequest('unsend', 'DELETE')} /> : <></>}
                    {status == 'accepted' ? <Button text='Unfollow' type='button' onClick={() => handleFriendRequest('unsend', 'DELETE')} /> : <></>}
                </>
            )}
        </div>
    );
};

export default ProfileCard;

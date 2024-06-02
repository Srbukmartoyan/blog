import useSWR, { mutate } from "swr";
import { Button } from "../components";
import '../components/styles/style.css';

const fetcher = (url) => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        alert('You must be logged in to make a friend request');
        return;
    }
    return fetch(url, {
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
};

const Friends = () => {
    const { data: followers, error: followersError } = useSWR('/friendRequest/accepted/followers', fetcher);
    const { data: followings, error: followingsError } = useSWR('/friendRequest/accepted/followings', fetcher);

    if (followersError || followingsError) return <div>Error loading data</div>;
    if (!followers || !followings) return <div>Loading...</div>;

    const handleDelete = async(url, body) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            alert('You must be logged in to make a friend request');
            return;
        }
        try {
            const response = await fetch(`/friendRequest/${url}`, {
                method : 'DELETE',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Failed to delete');
            }
            url == 'remove' ? mutate('/friendRequest/accepted/followers') : mutate('/friendRequest/accepted/followings');
        } catch(error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <div className='w-full h-[92vh] friends-bg-image'>
            <h1 className='text-4xl font-bold text-center text-gray-400 p-8'>Friends</h1>
            <div className='flex justify-center gap-4'>
                <ul className="h-[75vh] overflow-y-auto">
                    <h2 className='text-2xl font-bold text-center text-gray-400 mb-4'>Followers</h2>
                    {followers.length === 0 ? (
                        <div className="text-center text-gray-400 mt-8">No follower</div>
                    ) : (
                        followers.map(follower => (
                            <div key={follower.id} className="flex justify-center">
                                <li className='py-6 mb-4 px-12 bg-gray-200 rounded-lg'>
                                    <div>
                                        <strong>Name:</strong> {follower.requester.name}
                                    </div>
                                    <div>
                                        <strong>Email:</strong> {follower.requester.email}
                                    </div>
                                    <Button text='remove' type='button' onClick={() => handleDelete('remove', { requesterId: follower.requester.id })}/>
                                </li>
                            </div>
                        ))
                    )}
                </ul>

                <ul className="h-[75vh] overflow-y-auto">
                    <h2 className='text-2xl font-bold text-center text-gray-400 mb-4'>Following</h2>
                    {followings.length === 0 ? (
                        <div className="text-center text-gray-400 mt-8">No following</div>
                    ) : (
                        followings.map(following => (
                            <div key={following.id} className="flex justify-center">
                                <li className='py-6 px-12 mb-4 bg-gray-200 rounded-lg'>
                                    <div>
                                        <strong>Name:</strong> {following.recipient.name}
                                    </div>
                                    <div>
                                        <strong>Email:</strong> {following.recipient.email}
                                    </div>
                                    <Button text='unfollow' type='button' onClick={() => handleDelete('unsend', { recipientId : following.recipient.id })}/>
                                </li>
                            </div>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Friends;

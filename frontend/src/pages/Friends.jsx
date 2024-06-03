import useSWR, { mutate } from "swr";
import { FriendList, Button } from "../components";
import { fetcher } from "../utils/fetcher";
import '../styles/style.css';

const Friends = () => {
    const { data: followers, error: followersError } = useSWR('/friendRequest/friends?type=followers', fetcher);
    const { data: followings, error: followingsError } = useSWR('/friendRequest/friends?type=followings', fetcher);

    if (followersError || followingsError) return <div>Error loading data</div>;
    if (!followers || !followings) return <div>Loading...</div>;

    const handleDelete = async (url, body) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            alert('You must be logged in to make a friend request');
            return;
        }
        try {
            const response = await fetch(`/friendRequest/${url}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Failed to delete');
            }
            url == 'remove' ? mutate('/friendRequest/friends?type=followers') : mutate('/friendRequest/friends?type=followings');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const followerButtons = (friend) => (
        <Button text='remove' type='button' onClick={() => handleDelete('remove', { requesterId: friend.requester.id })} />
    );

    const followingButtons = (friend) => (
        <Button text='unfollow' type='button' onClick={() => handleDelete('unsend', { recipientId: friend.recipient.id })} />
    );

    return (
        <div className='w-full h-[92vh] friends-bg-image'>
            <h1 className='text-4xl font-bold text-center text-gray-400 p-8'>Friends</h1>
            <div className='flex justify-center gap-4'>
                <FriendList title="Followers" data={followers} renderButtons={followerButtons} />
                <FriendList title="Following" data={followings} renderButtons={followingButtons} />
            </div>
        </div>
    );
};

export default Friends;

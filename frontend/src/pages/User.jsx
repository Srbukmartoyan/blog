import useSWR from 'swr';
import { Link, useParams } from 'react-router-dom';
import { authFetcher } from '../utils/fetcher';
import { BlogList } from '../components';
import { ProfileCard } from '../components';
import { Button } from '../components';
import useAuth from '../hooks/useAuth';

const User = () => {
    const token = useAuth();
    const { userId } = useParams();

    const fetchUserData = (url) => {
        if (userId) {
            return authFetcher(url);
        } else {
            const localStorageUser = localStorage.getItem('authUser');
            return localStorageUser ? JSON.parse(localStorageUser) : null;
        }
    };

    const { data: user, error: userError } = useSWR(userId ? `/users/${userId}/profile` : '/', fetchUserData);
    const { data: posts, error: postsError } = useSWR(userId ? `/users/${userId}/posts` : '/users/my/posts', authFetcher);
    const { data: status, error } = useSWR(`/friendRequest/status/${userId}`, authFetcher);

    if (userError || postsError) return <div className='mt-4 text-center text-red-700 font-bold'> Error: {userError ? userError.message : postsError.message} </div>
    if (!user || !posts) return <div className='mt-4 text-center text-red-700 font-bold'> Loading...</div>

    return (
        <div className='my-8'>
            {user &&
                <div className='mx-auto my-8 w-80 md:w-1/2 lg:w-1/4'>
                    <ProfileCard user={user} showAction={userId ? true : false} />
                    {!userId &&
                        <div className='flex justify-center'>
                            <Link to='/requests'>
                                <Button text='See Requests' />
                            </Link>
                            <Link to='/friends'>
                                <Button text='See Friends' />
                            </Link>
                        </div>
                    }
                </div>}
            {(userId && status === 'accepted') || !userId
                ? <BlogList posts={posts} title={`${userId ? `${user.name}'s` : 'My'} Posts`} showActions={userId ? false : true} />
                : <div className='text-center text-red-700 font-bold text-xl'>Follow to see posts</div>
            }
        </div>
    );
};

export default User;

import useSWR from 'swr';
import { Link, useParams } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import { BlogList } from '../components';
import { ProfileCard } from '../components';
import { Button } from '../components';

const User = () => {
    const { userId } = useParams();
    const { data: user, error: userError } = useSWR(userId ? `/users/${userId}/profile` : `/users/profile`, fetcher);
    const { data: posts, error: postsError } = useSWR(userId ? `/users/${userId}/posts` : '/users/posts', fetcher);

    if (userError || postsError) return <div className='mt-4 text-center text-red-700 font-bold'> Error: {userError ? userError.message : postsError.message} </div>
    if (!user || !posts)  return <div className='mt-4 text-center text-red-700 font-bold'> Loading...</div>
 
    return (
        <div className='my-8'>
            {user && 
            <div className='mx-auto my-8 w-80 md:w-1/2 lg:w-1/4'>
                <ProfileCard user={user} />
                <div className='flex justify-center'>
                    <Link to='/requests'>
                        <Button text='See Requests' />
                    </Link>
                    <Link to='/friends'>
                        <Button text='See Friends' />
                    </Link>
                </div>
            </div>}
            <BlogList posts={posts} title={`${userId ? `${user.name}'s` : 'My'} Posts`} showActions={userId ? false : true} />
        </div>
    );
};

export default User;

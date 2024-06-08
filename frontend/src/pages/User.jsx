import useSWR from 'swr';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { authFetcher } from '../utils/fetcher';
import { BlogList } from '../components';
import { ProfileCard } from '../components';
import { Button } from '../components';
import useAuth from '../hooks/useAuth';
import { ITEMS_PER_PAGE } from '../constants';
import usePagination from '../hooks/usePagination';
import PaginationButtons from '../components/PaginationButtons';

const User = () => {
    const token = useAuth();
    const { userId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUserData = (url) => {
        if (userId) {
            return authFetcher(url);
        } else {
            const localStorageUser = localStorage.getItem('authUser');
            if (localStorageUser) {
                const user = JSON.parse(localStorageUser);
                user.receivedRequests = [];
                return user;
            }
            return null;
        }
    };

    const { data: user, error: userError } = useSWR(userId ? `/users/${userId}/profile` : '/', fetchUserData);
    const { data: posts, error: postsError } = useSWR(userId ? `/users/${userId}/posts?page=${currentPage}&limit=${ITEMS_PER_PAGE}` : `/users/my/posts?page=${currentPage}&limit=${ITEMS_PER_PAGE}`, authFetcher);
    const { totalPages, nextPage, prevPage, handlePageClick } = usePagination(posts?.count, ITEMS_PER_PAGE, currentPage, setCurrentPage);

    if (userError || postsError) return <div className='mt-4 text-center text-red-700 font-bold'> Error: {userError ? userError.message : postsError.message} </div>
    if (!user || !posts) return <div className='mt-4 text-center text-red-700 font-bold'> Loading...</div>

    const status = user.receivedRequests[0]?.status;
    

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
                ? <>
                    <BlogList posts={posts.posts} title={`${userId ? `${user.name}'s` : 'My'} Posts`} showActions={userId ? false : true} />
                    <PaginationButtons 
                         currentPage={currentPage}
                         totalPages={totalPages}
                         handlePageClick={handlePageClick}
                         nextPage={nextPage}
                         prevPage={prevPage}
                    />
                </>
                : <div className='text-center text-red-700 font-bold text-xl'>Follow to see posts</div>
            }
        </div>
    );
};

export default User;

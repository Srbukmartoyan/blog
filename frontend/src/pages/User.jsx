import useSWR from 'swr';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import usePagination from '../hooks/usePagination';
import { SearchProvider } from '../context/SearchContext';
import { authFetcher } from '../utils/fetcher';

import { ITEMS_PER_PAGE } from '../constants';

import { BlogList, ProfileCard, Button, PaginationButtons } from '../components';

const UserContent = () => {
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
                    {userId && <Link to={'/chat'}><div className='text-center'>Chat</div></Link>}
                </div>}
            {(userId && status === 'accepted') || !userId
                ? <>
                    <BlogList posts={posts.posts} title={`${userId ? `${user.name}'s` : 'My'} Posts`} showActions={userId ? false : true} currentPage={currentPage} />
                    {totalPages > 0 && <PaginationButtons
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageClick={handlePageClick}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />}
                </>
                : <div className='text-center text-red-700 font-bold text-xl'>Follow to see posts</div>
            }
        </div>
    );
};


const User = () => (
    <SearchProvider>
        <UserContent />
    </SearchProvider>
)
export default User;

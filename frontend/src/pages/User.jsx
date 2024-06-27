import useSWR from 'swr';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from '../hooks/useAuth';
import usePagination from '../hooks/usePagination';
import { SearchProvider } from '../context/SearchContext';
import { authFetcher } from '../utils/fetcher';

import { ITEMS_PER_PAGE } from '../constants';

import { BlogList, ProfileCard, Button, PaginationButtons, LoadingIndicator, ErrorDisplay } from '../components';

const UserContent = () => {
    const { isAuthChecking } = useAuth();
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

    if (userError || postsError) return <ErrorDisplay />
    if (!user || !posts || isAuthChecking) return <LoadingIndicator />

    const status = user.receivedRequests[0]?.status;

    return (
        <div className='my-8'>
            <ToastContainer />
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
                    {userId &&
                        <Link to={'/chat'}>
                            <div className='flex gap-2 justify-center items-center'>
                                <span className='text-lg underline text-slate-600 hover:text-slate-800'>Send message</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-slate-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                            </div>
                        </Link>}
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

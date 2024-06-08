import useSWR from 'swr';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { authFetcher } from '../utils/fetcher';
import { BlogList } from '../components';
import { ProfileCard } from '../components';
import { Button } from '../components';
import useAuth from '../hooks/useAuth';
import { ITEMS_PER_PAGE } from '../constants';

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

    if (userError || postsError) return <div className='mt-4 text-center text-red-700 font-bold'> Error: {userError ? userError.message : postsError.message} </div>
    if (!user || !posts) return <div className='mt-4 text-center text-red-700 font-bold'> Loading...</div>

    const status = user.receivedRequests[0]?.status;

    const totalPages = Math.ceil(posts?.count / ITEMS_PER_PAGE);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const startPage = 1;
        const endPage = totalPages;
        const maxButtons = 5; // Maximum number of buttons to show before the last page

        if (totalPages <= maxButtons + 1) { // maxbuttons == 5 totalpages ==6 => ... do not need
            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === i ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            for (let i = startPage; i <= maxButtons; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === i ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
                    >
                        {i}
                    </button>
                );
            }

            buttons.push(<span key="ellipsis" className="mx-1">...</span>);

            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={`mx-1 px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-slate-500 text-white' : 'bg-slate-200 text-black'}`}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

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
                    <div className="flex justify-center items-center mt-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="mr-2 px-4 py-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-zinc-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        {renderPaginationButtons()}
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="ml-2 px-4 py-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-zinc-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <span className="ml-4 text-xl font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>
                </>
                : <div className='text-center text-red-700 font-bold text-xl'>Follow to see posts</div>
            }
        </div>
    );
};

export default User;

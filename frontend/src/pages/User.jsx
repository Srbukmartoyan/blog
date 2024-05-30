import React, { useEffect, useState } from 'react';
import { BlogList } from '../components';
import { ProfileCard } from '../components';

const User = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                setError('You must be logged in to view your posts.');
                setLoading(false);
                return;
            }

            try {
                const [userResponse, postsResponse] = await Promise.all([
                    fetch('/users/profile', {
                        headers: {
                            'auth-token': token,
                        },
                    }),
                    fetch('/users/posts', {
                        headers: {
                            'auth-token': token,
                        },
                    }),
                ]);

                if (!userResponse.ok || !postsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const userData = await userResponse.json();
                const postsData = await postsResponse.json();

                setUser(userData);
                setPosts(postsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    if (loading) {
        return <div className='mt-4 text-center text-red-700 font-bold'>Loading...</div>;
    }

    if (error) {
        return <div className='mt-4 text-center text-red-700 font-bold'>Error: {error}</div>;
    }

    return (
        <div className='my-8'>
            {user && <div className='mx-auto w-80 md:w-1/2 lg:w-1/4'><ProfileCard user={user} /></div>}
            <BlogList posts={posts} title="My Posts" showActions={true} />
        </div>
    );
};

export default User;

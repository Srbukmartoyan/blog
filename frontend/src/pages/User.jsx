import React, { useEffect, useState } from 'react';
import { BlogList } from '../components';

const User = () => {
    const [posts, setPosts] = useState([]);
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
                const response = await fetch('/user/posts', {
                    headers: {
                        'auth-token': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    if (loading) {
        return <div className='text-center text-red-700 font-bold'>Loading...</div>;
    }

    if (error) {
        return <div className='text-center text-red-700 font-bold'>Error: {error}</div>;
    }

    return (
        <div className='my-8'>
            <BlogList posts={posts} title="My Posts" showActions={true} />
        </div>
    );
};

export default User;

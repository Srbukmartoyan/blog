import useSWR, { mutate } from "swr";

import useAuth from "../hooks/useAuth";
import { getAuthToken } from "../utils/auth";
import { authFetcher } from "../utils/fetcher";

import { FriendList, Button, ErrorDisplay, LoadingIndicator } from "../components";

import '../styles/style.css';

const handleRequest = async (url, method, body) => {
    const token = getAuthToken();
    const response = await fetch(url, {
        method,
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error('Failed to process the request');
    }
    return response.json();
};

const FriendRequests = () => {
    const { isAuthChecking } = useAuth();
    const { data: requests, error } = useSWR('/friendRequest/friends?type=pending', authFetcher);

    const handleAction = async (requestId, status, isDelete = false) => {
        try {
            if (isDelete) {
                await handleRequest('/friendRequest/remove', 'DELETE', { requesterId: requestId });
            } else {
                await handleRequest('/friendRequest/respond', 'PUT', { requestId, status })
            }
            mutate('/friendRequest/friends?type=pending');
        } catch (err) {
            console.error(err);
        }
    };

    if (error) return <ErrorDisplay />
    if (!requests || isAuthChecking) return <LoadingIndicator />

    const buttons = (friend) => (
        <>
            <Button text='accept' type='button' onClick={() => handleAction(friend.id, 'accepted')} />
            <Button text='delete' type='button' onClick={() => handleAction(friend.requester.id, null, true)} />
        </>
    );

    return (
        <div className='w-full h-[92vh] requests-bg-image'>
            <FriendList title="Friend Requests" data={requests} renderButtons={buttons} />
        </div>
    )
}

export default FriendRequests;
import useSWR, { mutate } from "swr";
import { Button } from "../components";
import { fetcher } from "../utils/fetcher";
import '../styles/style.css';

const handleRequest = async (url, method, body) => {
    const token = localStorage.getItem('auth-token');
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

    const { data: requests, error } = useSWR('/friendRequest/pending', fetcher);
    console.log(requests);

    const handleAction = async (requestId, status, isDelete = false) => {
        try {
            if (isDelete) {
                await handleRequest('/friendRequest/remove', 'DELETE', { requesterId: requestId });
            } else {
                await handleRequest('/friendRequest/respond', 'PUT', { requestId, status })
            }
            mutate('/friendRequest/pending');
        } catch (err) {
            console.error(err);
        }
    };

    console.log(requests);
    if (error) return <div>error</div>
    if (!requests && !error) return <div>Loading ...</div>

    return (
        <div className='w-full h-[92vh] requests-bg-image'>
            <h1 className='text-4xl font-bold text-center text-gray-400 p-8'>Friend Requests</h1>
            <ul className="h-[75vh] overflow-y-auto">
                {requests.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">No friend requests</div>
                ) : (
                    requests.map(request => (
                        <div key={request.id} className="flex justify-center">
                            <li className='mb-4 py-6 px-12 bg-gray-200 rounded-lg'>
                                <div>
                                    <strong>Requester:</strong> {request.requester.name}
                                </div>
                                <div>
                                    <strong>Email:</strong> {request.requester.email}
                                </div>
                                <div className="flex justify-center">
                                    <Button text='accept' type='button' onClick={() => handleAction(request.id, 'accepted')} />
                                    <Button text='delete' type='button' onClick={() => handleAction(request.requester.id, null, true)} />
                                </div>
                            </li>
                        </div>
                    ))
                )}
            </ul>
        </div>
    )
}

export default FriendRequests;
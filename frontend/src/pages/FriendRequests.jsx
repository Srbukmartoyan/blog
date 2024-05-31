import useSWR from "swr";
import { Button } from "../components";
import '../components/styles/style.css';

const fetcher = (url) => {
    const token = localStorage.getItem('auth-token');
    return fetch(url, {
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
};

const FriendRequests = () => {

    const { data: requests, error } = useSWR('/friendRequest/pending', fetcher);

    console.log(requests);
    if (error) return <div>error</div>
    if (!requests && !error) return <div>Loading ...</div>

    

    return (
        <div 
            className='w-full h-[92vh] requests-bg-image'
        >
            <h1 className='text-4xl font-bold text-center text-gray-400 p-8'>Friend Requests</h1>
            <ul className="h-[75vh] overflow-y-auto">
                {requests.map(request => (
                    <div className="flex justify-center">
                        <li key={request.id} className='mb-4 py-6 px-12 bg-gray-200 rounded-lg'>
                            <div>
                                <strong>Requester:</strong> {request.requester.name}
                            </div>
                            <div>
                                <strong>Email:</strong> {request.requester.email}
                            </div>
                            <div className="flex justify-center">
                                <Button text='accept' type='button' />
                                <Button text='delete' type='button' />
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default FriendRequests;
import { Button } from "../../Button";
const Friend = ({ friend, handleDelete }) =>  (
    <div className="flex justify-center">
        <li className='py-6 mb-4 px-12 bg-gray-200 rounded-lg'>
            <div>
                <strong>Name:</strong> {friend.requester?.name || friend.recipient?.name}
            </div>
            <div>
                <strong>Email:</strong> {friend.requester?.email || friend.recipient?.email}
            </div>
            <Button text={friend.requester ? 'remove' : 'unfollow'} type='button' onClick={() => handleDelete(friend.requester ? 'remove' : 'unsend', { [friend.requester ? 'requesterId' : 'recipientId']: friend.requester ? friend.requester.id : friend.recipient.id })}/>
        </li>
    </div>
);

export default Friend;

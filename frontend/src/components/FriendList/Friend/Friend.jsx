import { Link } from "react-router-dom";

const Friend = ({ friend, renderButtons }) =>   (
    <div className="flex justify-center">
        <li className='py-6 mb-4 px-12 bg-gray-200 opacity-90 rounded-lg'>
            <Link to={`/users/${friend.requester?.id || friend.recipient?.id}`}>
                <div>
                    <strong>Name:</strong> {friend.requester?.name || friend.recipient?.name}
                </div>
                <div>
                    <strong>Email:</strong> {friend.requester?.email || friend.recipient?.email}
                </div>
            </Link>
            <div className="flex justify-center">
                {renderButtons(friend)}
            </div>        
        </li>
    </div>
);

export default Friend;

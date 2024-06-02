import Friend from "./Friend/Friend";
const FriendList = ({ title, data, renderButtons }) => (
    <ul className="h-[75vh] overflow-y-auto">
        <h2 className='text-2xl font-bold text-center text-gray-400 mb-4 p-4'>{title}</h2>
        {data.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">No {title.toLowerCase()}</div>
        ) : (
            data.map(friend => (
                <Friend key={friend.id} friend={friend} renderButtons={renderButtons} />
            ))
        )}
    </ul>
);

export default FriendList;

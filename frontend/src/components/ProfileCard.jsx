const ProfileCard = ({ user }) => {
    return (
        <div className="shadow-md rounded-md p-6 my-4 hover:shadow-lg transition ease-linear delay-150 w-1/4 mx-auto">
            <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0">
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;

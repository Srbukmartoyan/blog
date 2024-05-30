import { useState } from "react";
import { Button } from "./Button";
import useSWR, { mutate } from "swr";

const fetcher = (url) => {
    const token = localStorage.getItem('auth-token');
    return fetch(url, {
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
};

const ProfileCard = ({ user, showAction }) => {
    const { data: status, error } = useSWR(`/friendRequest/status/${user.id}`, fetcher);

    console.log(status);
    if (error) return <div>error</div>
    if (!status && !error) return <div>Loading ...</div>

    const handleFollow = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            alert('You must be logged in to make a friend request');
            return;
        }
        try {
            const response = await fetch('/friendRequest/send', {
                method: 'POST',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipientId: user.id }),
            });

            if(!response.ok) {
                throw new Error('failed to send friend request');
            }

            const data = await response.json();
            console.log('friend request sent:', data);
            mutate(`/friendRequest/status/${user.id}`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    
    const handleUnfollow = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            alert('You must be logged in to make a friend request');
            return;
        }
        try {
            const response = await fetch('/friendRequest/unsend', {
                method: 'DELETE',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipientId: user.id }),
            });

            if(!response.ok) {
                throw new Error('failed to unfollow');
            }

            console.log('friend request deleted');
            mutate(`/friendRequest/status/${user.id}`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

   const setButtonText = () => {
    if (status.status) {
        if (status.status === 'none' || status.status === 'rejected') {
            return 'Follow';
        } else if (status.status === 'accepted'){
            return 'Following';
        } else {
            return 'Requested';
        }
    } 
    return 'Follow';
   }

    return (
        <div className="shadow-md rounded-md p-6 my-4 bg-slate-100 hover:shadow-lg transition ease-linear delay-150 mx-auto">
            <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-400 flex-shrink-0">
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
            {showAction && (
                <>
                    <Button text={setButtonText()} type='button' onClick={handleFollow}/>
                    {status.status == 'pending' ? <Button text='Delete Request' type='button' onClick={handleUnfollow} /> : <></>}
                    {status.status == 'accepted' ? <Button text='Unfollow' type='button' onClick={handleUnfollow} /> : <></>}
                </>
            )}
        </div>
    );
};

export default ProfileCard;

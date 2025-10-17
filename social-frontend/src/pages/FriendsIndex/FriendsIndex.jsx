// this page displays your friends and also a list of users that you can add
import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export default function FriendsIndex() {
    const apiUrl = import.meta.env.VITE_API_LINK;
    const [userFriends, setUserFriends] = useState([])
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [error, setError] = useState('')
    const { currentUser } = useOutletContext()

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/friends`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => { 
            setUserFriends(response)
        })
        .catch((error) => setError(error))
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/friends/suggestedfrogs`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => { 
            setSuggestedUsers(response)
        })
        .catch((error) => setError(error))
    }, []);

    console.log(currentUser)
    console.log(userFriends)

    return (
        <>
        <div className="friends-index">
            <div className="friends-list">
                <div className="friends-list-header"><h2>Your friends</h2></div>
                {userFriends.contacts && 
                userFriends.contacts.length > 0 ?
                    <>
                    {userFriends.contacts.map((contact, index) => (
                        <div key={contact.id}>{contact.name}</div>
                    ))}
                    </>
                    :
                    <div>No friends yet. Add some.</div>
                }
            </div>
            <div className="suggested-friends-sidebar">
                <div className="suggested-friends-list-header"><h2>Frogs you may know</h2></div>
                <div className="suggested-friends-list">
                    {suggestedUsers.map((user, index) => (
                        <div key={user.id}>
                        {/* display user's name unless it is current user */}
                        {(user.id==currentUser.id)  ?
                            <div>don't show this</div>
                            :
                            <div>{user.name}</div>
                        }
                        {/* display add button if NOT in user's friends list */}
                        {userFriends.contacts &&
                        userFriends.contacts.includes(user.id) ?
                        <div>this is your friend</div>
                        :
                        <button>add friend</button>
                        }
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}
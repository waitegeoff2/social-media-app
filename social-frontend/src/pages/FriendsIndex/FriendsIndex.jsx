// this page displays your friends and also a list of users that you can add
import { useEffect, useState } from "react";

export default function FriendsIndex() {
    const apiUrl = import.meta.env.VITE_API_LINK;
    const [userFriends, setUserFriends] = useState([])
    const [error, setError] = useState('')

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
            console.log(response)
        })
        .catch((error) => setError(error))
    }, []);

    return (
        <>
        <div className="friends-index">
            <div className="friends-list">

            </div>
            <div className="suggested-friends-sidebar">
                <div>hi</div>
            </div>
        </div>
        </>
    )
}
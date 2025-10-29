import { useState, useEffect } from 'react'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import FriendWall from '../../components/FriendWall/FriendWall'
import ProfileDetailsSidebar from '../../components/ProfileDetailsSidebar/ProfileDetailsSidebar'
import './FriendProfile.css'

export default function FriendProfile() {
    const [loading, setLoading] = useState(true)
    const [friendWallPosts, setFriendWallPosts] = useState([])
    const [currentFriend, setCurrentFriend] = useState('')
    const [isFriend, setIsFriend] = useState(false)
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_LINK;
    const friendId = useParams()
    const { currentUser, userFriends } = useOutletContext()
    console.log(currentUser)

    //check if this user is currentusers' friend. Adjust wall accordingly
    useEffect(() => {
        const targetId = currentFriend.id

        if(currentUser && currentUser.contacts.some(contact => contact.id === targetId)) {
            setIsFriend(true)
        } else {
            setIsFriend(false)
        }

        console.log(isFriend)
    }, [currentFriend, userFriends]);

    //fetch details about this user to populate profile
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/access/friend/${friendId.userId}`, { 
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },     
        })
        .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
        })
        .then((response) => {
            console.log(response)
            setCurrentFriend(response)
        })
        .catch((error) => setError(error))
    }, []);

    // Fetch posts that this user has received and set wall posts
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/posts/${friendId.userId}`, { 
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
            setFriendWallPosts(response)
            setLoading(false)
        })
        .catch((error) => setError(error))
    }, []);

    console.log(isFriend)

    return (
        <>
        {loading ? 
        <div></div>
        :
        <div className="profile-body">
            <ProfileDetailsSidebar userWall={currentFriend}  />
            <FriendWall userWallPosts={friendWallPosts} setUserWallPosts={setFriendWallPosts} currentFriend={currentFriend} isFriend={isFriend}/>
        </div>
        }
        </>
    )
}
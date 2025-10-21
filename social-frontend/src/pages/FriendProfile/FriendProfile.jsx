//This is a profile of someone you click on, generated using a dynamic url
//can use a "friend" state variable to control what you can see on their page
import { useState, useEffect } from 'react'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import FriendWall from '../../components/FriendWall/FriendWall'
import ProfileDetailsSidebar from '../../components/ProfileDetailsSidebar/ProfileDetailsSidebar'
import './FriendProfile.css'

export default function FriendProfile() {
    //get user info and populate the user's wall when opening profile page
    const [friendWallPosts, setFriendWallPosts] = useState([])
    const [currentFriend, setCurrentFriend] = useState('')
    const [isFriend, setIsFriend] = useState(false)
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_LINK;
    const friendId = useParams()
    console.log(friendId)
    const { currentUser } = useOutletContext()

    //USEEFFECT TO CHECK IF THIS USER IS YOUR FRIEND, set to true or false
    useEffect(() => {
        //if currentuser.contacts CONTAINS friend.id
        //setisfriend(true)
    }, []);

    //fetch details about THIS user's profile(for dynamic links) INCLUDING MESSAGES THEY'VE RECEIVED
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

    //UPDATE: Fetch posts that THIS user has received and set wall posts
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
            console.log(response)
            setFriendWallPosts(response)
            // console.log(response.messagedetails.friendDetails)
            // setSelectedFriend(response.messagedetails.friendDetails)
            // setMessages(response.messagedetails.messageHistory)
            // console.log('New chat selected.')
        })
        .catch((error) => setError(error))
    }, []);

    //GET THE REQUESTS THAT WERE SENT TO THE USER
    console.log(currentFriend)

    return (
        <>
        <div className="profile-body">
            <ProfileDetailsSidebar currentUser={currentFriend} />
            <FriendWall userWallPosts={friendWallPosts} setUserWallPosts={setFriendWallPosts} currentFriend={currentFriend}/>
        </div>
        </>
    )
}
//HOME PAGE BASICALLY: main profile page with details on left side, posts (wall) in middle, and a friends sidebar on right (maybe NOT??)
    //navbar on top with links to friends index page, feed index page, profile edit.
    //login page OR this page

import { useState, useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import Wall from '../../components/Wall/Wall'
import ProfileDetailsSidebar from '../../components/ProfileDetailsSidebar/ProfileDetailsSidebar'
import './Profile.css'

let fakeCurrentUser = {}

export default function Profile() {
    //get user info and populate the user's wall when opening profile page
    const [userWallPosts, setUserWallPosts] = useState([])
    //don't think i need this anymore
    const [maxPostId, setMaxPostId] = useState(0)
    const { currentUser } = useOutletContext()
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_LINK;

    //UPDATE: Fetch post that user has received and set wall posts
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/posts`, { 
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
            setUserWallPosts(response.wallposts)
            setMaxPostId(response.maxId)
            //SET MAX ID
            // console.log(response.messagedetails.friendDetails)
            // setSelectedFriend(response.messagedetails.friendDetails)
            // setMessages(response.messagedetails.messageHistory)
            // console.log('New chat selected.')
        })
        .catch((error) => setError(error))
    }, []);

    return (
        <>
        {/* PROFILE INFO */}
        <div className="profile-body">
            <ProfileDetailsSidebar userWall={currentUser} />
            <Wall userWallPosts={userWallPosts} setUserWallPosts={setUserWallPosts} currentUser={currentUser} maxPostId={maxPostId}/>
        </div>
        </>
    )
}
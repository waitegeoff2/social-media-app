//HOME PAGE BASICALLY: main profile page with details on left side, posts (wall) in middle, and a friends sidebar on right (maybe NOT??)
    //navbar on top with links to friends index page, feed index page, profile edit.
    //login page OR this page

import { useState, useEffect } from 'react'
import Wall from '../../components/Wall/Wall'
import ProfileDetailsSidebar from '../../components/ProfileDetailsSidebar/ProfileDetailsSidebar'
import './Profile.css'

export default function Profile() {
    //get user info and populate the user's wall when opening profile page
    const [currentUser, setCurrentUser] = useState()
    const [userWallPosts, setUserWallPosts] = useState([])
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_LINK;

    //Fetch details about current user
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/access/user`, { 
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
            setCurrentUser(response)
        })
        .catch((error) => setError(error))
    }, []);

    //fetch details about THIS user's profile(for dynamic links)

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
            setUserWallPosts(response)
            // console.log(response.messagedetails.friendDetails)
            // setSelectedFriend(response.messagedetails.friendDetails)
            // setMessages(response.messagedetails.messageHistory)
            // console.log('New chat selected.')
        })
        .catch((error) => setError(error))
    }, []);

    //GET THE REQUESTS THAT WERE SENT TO THE USER

    return (
        <>
        {/* PROFILE INFO */}
        <div className="profile-body">
            <ProfileDetailsSidebar currentUser={currentUser} />
            <Wall userWallPosts={userWallPosts} setUserWallPosts={setUserWallPosts} currentUser={currentUser}/>
        </div>
        </>
    )
}
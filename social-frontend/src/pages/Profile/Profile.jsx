import { useState, useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import Wall from '../../components/Wall/Wall'
import ProfileDetailsSidebar from '../../components/ProfileDetailsSidebar/ProfileDetailsSidebar'
import './Profile.css'

export default function Profile() {
    //get user info and populate the user's wall when opening profile page
    const [userWallPosts, setUserWallPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const { currentUser } = useOutletContext()
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_LINK;

    //***don't think i need this anymore
    const [maxPostId, setMaxPostId] = useState(0)

    //Fetch all user's posts to populate wall
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
            setLoading(false)
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
        {loading ? 
        <div></div>
        :
        <div className="profile-body">
            <ProfileDetailsSidebar userWall={currentUser} />
            <Wall userWallPosts={userWallPosts} setUserWallPosts={setUserWallPosts} currentUser={currentUser} maxPostId={maxPostId}/>
        </div>
        }
        </>
    )
}
//display ALL posts (that will include their statuses and other posts), 
// order by date

import { useEffect, useState } from "react";
import './PostsIndex.css'
import { Link } from "react-router-dom";

export default function PostsIndex() {

    const apiUrl = import.meta.env.VITE_API_LINK;
    const [indexPosts, setIndexPosts] = useState([])
    const [error, setError] = useState()

    //useeffect here to get posts
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`${apiUrl}/posts/recent`, { 
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
            console.log(response.contacts)
            const contactsArray = response.contacts
            //combine all recentposts from friends into a single array
            const allRecents = contactsArray.map(contact => contact.postfrom).flat()
            //sort posts by date posted (most recent first)
            allRecents.sort((a, b) => {
                const dateA = new Date(a.sendTime);
                const dateB = new Date(b.sendTime);

                return dateB - dateA;
            })
            console.log(allRecents)
            setIndexPosts(allRecents)
            //MAP the response.contacts array and then MAP the inner response.contacts.postsfrom
        })
        .catch((error) => setError(error))
    }, []);

    //

    return (
        <>
        <div className="posts-index-feed">
            {/* indexposts.map */}
            <div className="posts-index-header"><h2>Recent posts from your frogs (friends):</h2></div>
            <div className="posts-index-list-container">
                { indexPosts.map((post, index) => (
                    (post.receiverId==post.senderId) ?
                        <div key={post.id} className="wallpost user-post">
                            <div className="top-row">
                                <span className="message-context"><Link className='profile-link' to={`/profile/${post.sender.id}`}><b>{post.sender.name}</b></Link> says:</span>
                                <span>{post.sendTime}</span>
                            </div>
                            <div className="message-content">{post.content}</div>
                        </div>
                        :
                        <div key={post.id} className="wallpost sender-post">
                            <div className="top-row">
                                <span className="message-context"><Link className='profile-link' to={`/profile/${post.sender.id}`}><b>{post.sender.name}</b></Link> {' > '} <Link className='profile-link' to={`/profile/${post.receiver.id}`}><b>{post.receiver.name}</b> </Link>:</span>
                                <span>{post.sendTime}</span>
                            </div>
                            <div className="message-content">{post.content}</div>
                        </div>          
                ))}
            </div>
        </div>
        </>
    )
}
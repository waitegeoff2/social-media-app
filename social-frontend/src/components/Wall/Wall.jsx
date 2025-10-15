import { useState } from "react";
import CRUDDropDown from "../CRUDDropdown/CRUDDropdown";
import './Wall.css'
import Icon from '@mdi/react';
import { mdiThumbUp } from '@mdi/js';
import PostComments from "../PostComments/PostComments";

export default function Wall({ userWallPosts, setUserWallPosts, currentUser }) {
    const [statusContent, setStatusContent] = useState('')
    const [showComments, setShowComments] = useState(false)
    const apiUrl = import.meta.env.VITE_API_LINK;

    const changeComments = () => {
        setShowComments(!showComments); // Toggles the state
    };

    async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken');

        //add message to db
        try {
            await fetch(`${apiUrl}/posts/createpost`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentUser, statusContent }), 
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => { 
                console.log(response)
                //set local state variable for instant update. Data was saved to db too
                // setMessages((prevMessages) => [...prevMessages, { content: messageContent }]);
                // console.log(messageContent)
                setStatusContent('')
            })
        } catch(error) {
            console.log(error)
        }
    }

    async function handleLike(postId) {
        console.log(postId)

        const token = localStorage.getItem('jwtToken');

        //add message to db
        try {
            await fetch(`${apiUrl}/posts/createlike`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ postId }), 
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => { 
                console.log(response)
                //set local state variable for instant update. Data was saved to db too
                // setMessages((prevMessages) => [...prevMessages, { content: messageContent }]);
                // console.log(messageContent)
                //setPostLikes
            })
        } catch(error) {
            console.log(error)
        }
    }

    async function handleComment(postId) {
        console.log(postId)
    }

    return (
        <>
            <div className="user-wall">
                <div className="status-input">
                    <form className="send-form" onSubmit={handleSubmit}>
                            <textarea
                                className="status-textarea"
                                id="statusContent"
                                name="statusContent"
                                value={statusContent}
                                onChange={(e) => setStatusContent(e.target.value)}
                                rows="2" //rows in text area
                                cols="100" // width
                            />
                            <button className="msg-send-btn button-2000s" type="submit">Send</button>
                    </form>
                </div>
                <div className="wall-feed">
                    { userWallPosts.map((wallPost) => (
                        <div key={wallPost.id} className="wallpost-item">
                        {/* check if it's a self post and adjust the display */}
                            { (wallPost.senderId==wallPost.receiverId) ?
                                <div key={wallPost.id} className="wallpost user-post">
                                    <div className="top-row">
                                        <span className="message-context"><b>{wallPost.sender.name} says:</b></span>
                                        <span>{wallPost.sendTime}</span>
                                    </div>
                                    <div className="message-content">{wallPost.content}</div>
                                </div>
                                :
                                <div key={wallPost.id} className="wallpost sender-post">
                                    <div className="top-row">
                                        <span className="message-context"><b>{wallPost.sender.name} {' > '} {wallPost.receiver.name}:</b></span>
                                        <span>{wallPost.sendTime}</span>
                                    </div>
                                    <div className="message-content">{wallPost.content}</div>
                                </div>
                                
                            }
                            
                            <div className="like-comment-list">
                                { (wallPost.likes).length > 0 ?  
                                <div className="like-display">
                                    {(wallPost.likes).length}
                                    <Icon path={mdiThumbUp} size={0.8} />
                                </div> 
                                : 
                                <div className="like-display">
                                    <span>0</span>
                                    <Icon path={mdiThumbUp} size={0.8} />
                                </div> 
                                }
                                <span onClick={() => handleLike(wallPost.id)} className="like-comment">Like</span>
                                <span onClick={changeComments} className="like-comment">Comments ({wallPost.comments.length})</span>
                                <CRUDDropDown className='crud-dropdown' currentPost={wallPost.id}/>
                            </div>
                            <div className="comments-section">
                                    <>
                                    <PostComments comments={wallPost.comments} handleComment={handleComment} showComments={showComments} setShowComments={setShowComments} postId={wallPost.id}/>
                                    </>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
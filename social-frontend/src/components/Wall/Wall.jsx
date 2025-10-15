import { useState } from "react";
import CRUDDropDown from "../CRUDDropdown/CRUDDropdown";
import './Wall.css'

export default function Wall({ userWallPosts, setUserWallPosts, currentUser }) {
    const [statusContent, setStatusContent] = useState('')
    const apiUrl = import.meta.env.VITE_API_LINK;

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
        //useeffect to add like to that post
    }

    async function handleComment(postId) {
        //useeffect to add comment to that post
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
                                { (wallPost.likes.length > 0) ?  <div>{wallPost.likes.length}<div> : <div>0</div> }
                                <span className="like-comment">Like</span>
                                <span className="like-comment">Comment</span>
                                <CRUDDropDown className='crud-dropdown' currentPost={wallPost.id}/>
                            </div>
                            {/* <PostComments postId={wallPost.id}/> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
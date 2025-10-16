import { useState } from "react";
import './Wall.css'
import PostCommentsLikesBar from "../PostCommentsLikesBar/PostCommentsLikesBar";

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
                //add a temporary id to the temporary state variable for instant render
                //CAN MOVE THIS UP BEFORE API CALL
                const newArray = [...userWallPosts]   
                const biggestId = newArray[0].id
                const newId = biggestId + 1            
                const newPost = {
                    id: newId,
                    senderId: currentUser.id,
                    receiverId: currentUser.id,
                    content: statusContent,
                    sender: {name: currentUser.name},
                    receiver: {name: currentUser.name},
                    likes: [],
                    comments: [],
                }
                setUserWallPosts((prevUserWallPosts) => [newPost, ...prevUserWallPosts])
                setStatusContent('')
            })
        } catch(error) {
            console.log(error)
        }
    }

    console.log(userWallPosts)

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
                    { userWallPosts.map((wallPost, index) => (
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
                            <div className="comments-likes-section">
                                <PostCommentsLikesBar comments={wallPost.comments} likes={wallPost.likes} postId={wallPost.id} postIndex={index} userWallPosts={userWallPosts} setUserWallPosts={setUserWallPosts} currentUser={currentUser}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
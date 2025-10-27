import { useState } from "react";
import './FriendWall.css'
import PostCommentsLikesBar from "../PostCommentsLikesBar/PostCommentsLikesBar";
import { useOutletContext } from "react-router-dom";

export default function FriendWall({ userWallPosts, setUserWallPosts, currentFriend, isFriend }) {
    //currentuserwall is the details of the user whose wall it is - receiver id
    //UPDATE BELOW CODE
    const [statusContent, setStatusContent] = useState('')
    const apiUrl = import.meta.env.VITE_API_LINK;
    //the user (you) - the sender id
    const { currentUser } = useOutletContext()
    let sender = currentUser;

    async function handleBtnRequest(userId) {
        const token = localStorage.getItem('jwtToken');

        try {
            await fetch(`${apiUrl}/friends/requestfriendbyid`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId }),
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {   
                console.log(response)
            })
        } catch(error) {
            console.log(error)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken');
        //dealing with naming differences from other component
        let currentUser = currentFriend;

        //add message to db
        try {
            //ADD THIS TO BACKEND
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
                setUserWallPosts(response.posts)
                setStatusContent('')
                //add a temporary id to the temporary state variable for instant render
                //CAN MOVE THIS UP BEFORE API CALL
                // const newArray = [...userWallPosts] 
                // //something in here is wrong
                // if(newArray.length==0) {
                //     const newId =0;
                //     const newPost = {
                //         id: newId,
                //         senderId: sender.id,
                //         receiverId: currentFriend.id,
                //         content: statusContent,
                //         sender: {name: sender.name},
                //         receiver: {name: currentFriend.name},
                //         likes: [],
                //         comments: [],
                //     }
                //     setUserWallPosts((prevUserWallPosts) => [newPost, ...prevUserWallPosts])
                //     setStatusContent('')
                // } else {
                //     const biggestId = newArray[0].id
                //     const newId = biggestId + 1            
                //     const newPost = {
                //         id: newId,
                //         senderId: sender.id,
                //         receiverId: currentFriend.id,
                //         content: statusContent,
                //         sender: {name: sender.name},
                //         receiver: {name: currentFriend.name},
                //         likes: [],
                //         comments: [],
                //     }
                //     setUserWallPosts((prevUserWallPosts) => [newPost, ...prevUserWallPosts])
                //     setStatusContent('')
                // }
            })
        } catch(error) {
            console.log(error)
        }
    }

    console.log(currentFriend)

    return (
        <>
            <div className="user-wall">
                <h2 className="wall-header">{currentFriend.name}'s Pad</h2>
                {isFriend ? 
                <div className="status-input">
                    <form className="send-form" onSubmit={handleSubmit}>
                            <textarea
                                className="status-textarea"
                                id="statusContent"
                                name="statusContent"
                                value={statusContent}
                                onChange={(e) => setStatusContent(e.target.value)}
                                rows="2" //rows in text area

                            />
                            
                            <button className="msg-send-btn button-2000s" type="submit">Send Message</button>        
                    </form> 
                </div>
                :
                <button onClick={() => handleBtnRequest(currentFriend.id)} className="add-btn">Add {currentFriend.name} as friend.</button>
                }
                {isFriend &&
                <div className="wall-feed">
                    { userWallPosts.map((wallPost, index) => (
                        <div key={wallPost.id} className="wallpost-item">
                        {/* this display isn't working */}
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
                                <PostCommentsLikesBar comments={wallPost.comments} likes={wallPost.likes} postId={wallPost.id} postIndex={index} userWallPosts={userWallPosts} setUserWallPosts={setUserWallPosts} currentUser={currentUser} receiverId={wallPost.receiverId}/>
                            </div>
                        </div>
                    ))}
                </div>
                }
            </div>
        </>
    )
}
import { useState } from "react";
import CRUDDropDown from "../CRUDDropdown/CRUDDropdown";

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
                                rows="5" //rows in text area
                                cols="50" // width
                            />
                            <button className="msg-send-btn button-2000s" type="submit">Send</button>
                    </form>
                </div>
                <div className="wall-feed">
                    { userWallPosts.map((wallPost) => (
                        <div key={wallPost.id} className="wallpost-item">
                        {/* check if it's a self post and adjust the display */}
                            { (wallPost.senderId==wallPost.receiverId) ?
                                <div key={wallPost.id} className="user-post">
                                    <span className="message-context"><b>{wallPost.sender.name} says:</b></span>
                                    <div className="message-content">{wallPost.content}</div>
                                </div>
                                :
                                <div key={wallPost.id} className="message-in-box your-message">
                                    <span className="message-context"><b>{wallPost.sender.name} {' > '} {wallPost.receiver.name}:</b></span>
                                    <div className="message-content">{wallPost.content}</div>
                                </div>
                                
                            }
                            < CRUDDropDown />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
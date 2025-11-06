// Displays the comments for each individual post
import { useState } from "react"
import './PostCommentsLikesBar.css'
import Icon from '@mdi/react';
import { mdiThumbUp } from '@mdi/js';
import CRUDDropDown from "../CRUDDropdown/CRUDDropdown";


export default function PostComments({ comments, likes, postId, postIndex, userWallPosts, setUserWallPosts, currentUser, receiverId }) {
    const [commentContent, setCommentContent] = useState('')
    const [showComments, setShowComments] = useState(false)
    const apiUrl = import.meta.env.VITE_API_LINK;

    const changeComments = () => {
        setShowComments(!showComments); // Toggles the state
    };

    async function deleteLike(postId, index) {
        const token = localStorage.getItem('jwtToken');

                //add message to db
        try {
            await fetch(`${apiUrl}/posts/deletelike`, { 
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
                //temporary state variable for instant update. Add a fake like object to this wallpost (using its index)
                //I prefer just sending back updated database and updating, but here's another way
                const newLikes = [...userWallPosts]
                const idToDelete = currentUser.id;
                const indexToDelete = newLikes[index].likes.findIndex(like => like.authorId === idToDelete)
                console.log(indexToDelete)
                if (indexToDelete !== -1) {
                    newLikes[index].likes.splice(indexToDelete, 1); // Remove 1 element at the found index
                }
                console.log(newLikes)
                setUserWallPosts(newLikes)

            })
        } catch(error) {
            console.log(error)
        }
    }

    async function handleLike(postId, index) {
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
                //temporary state variable for instant update. Add a fake like object to this wallpost (using its index)
                //I prefer just sending back updated database and updating, but here's another way
                const newLikes = [...userWallPosts]
                //only allow one like to be added
                if(newLikes[index].likes.some(like => like.authorId === currentUser.id)) {
                    deleteLike(postId, index)
                    console.log("can't add another like")
                    return;
                } else {
                    newLikes[index].likes.push({ author: currentUser.name, authorId: currentUser.id, postId: postId })
                    setUserWallPosts(newLikes)
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    async function handleComment(e) {
        e.preventDefault()
        console.log('in handle comment')
        console.log(postId)
        const token = localStorage.getItem('jwtToken');

        try {
            await fetch(`${apiUrl}/posts/createcomment`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ postId, commentContent }), 
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => { 
                console.log(response)
                console.log('handle function WORKED')
                //temporary comment state variable for instant update.
                //I prefer just sending back updated json from db and updating, but here's another way
                const newComments = [...userWallPosts]
                if (newComments[postIndex].comments.length==0) {
                    const newId = 0;
                    const name = currentUser.name;
                    const newCommentPost = {
                        id: newId,
                        author: { name: name },
                        authorId: currentUser.id,
                        postId: postId,
                        content: commentContent,
                    }
                    newComments[postIndex].comments.push(newCommentPost)
                    setUserWallPosts(newComments)
                    setShowComments(true)
                    setCommentContent('')
                } else {
                    const biggestId = newComments[postIndex].comments[0].id
                    const newId = biggestId + 1 
                    const name = currentUser.name;
                    const newCommentPost = {
                        id: newId,
                        author: { name: name },
                        authorId: currentUser.id,
                        postId: postId,
                        content: commentContent,
                    }
                    newComments[postIndex].comments.unshift(newCommentPost)
                    setUserWallPosts(newComments)
                    setShowComments(true)
                    setCommentContent('')
                }  
            })
        } catch(error) {
            console.log(error)
        }

    }


    return (
        <>
        <div className="like-comment-list">
            { (likes).length > 0 ?  
            <div className="like-display">
                {(likes).length}
                <Icon path={mdiThumbUp} size={0.8} />
            </div> 
            : 
            <div className="like-display">
                <span>0</span>
                <Icon path={mdiThumbUp} size={0.8} />
            </div> 
            }
            <span onClick={() => handleLike(postId, postIndex)} className="like-comment">Like</span>
            <span onClick={changeComments} className="like-comment">Comments ({comments.length})</span>
            {currentUser.id == receiverId &&
            <CRUDDropDown className='crud-dropdown' currentPost={postId}/>
            }   
        </div>
        {showComments && 
        <div className="post-comments">
            <div className="add-comment-input">
                <form className="comment-form" onSubmit={handleComment}>
                    <textarea
                        className="comment-textarea"
                        id="statusContent"
                        name="statusContent"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        rows="4" //rows in text area
                    />
                    <button className="comment-btn button-2000s" type="submit">Add comment</button>
                </form>
            </div>
            <div className="comments-feed">
                {comments.map((comment) => (
                    <div className="comment-display" key={comment.id}>
                        <div className="top-row">
                            <span className="message-context"><b>{comment.author.name} says:</b></span>
                        </div>
                        <div className="message-content">{comment.content}</div>
                    </div>
                ))}
            </div>
        </div>
        }
        </>
    )
}
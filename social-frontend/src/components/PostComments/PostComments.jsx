// Displays the comments for each individual post

import { useState } from "react"
import './PostComments.css'

export default function PostComments({ comments, handleComment, showComments, setShowComments, postId }) {
    const [commentContent, setCommentContent] = useState('')

    return (
        <>
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
                        rows="2" //rows in text area

                    />
                    <button className="comment-btn button-2000s" type="submit">Add comment</button>
                </form>
            </div>
            <div className="comments-feed">
                {comments.map((comment) => (
                    <div>{comment.id}</div>
                ))}
            </div>
        </div>
        }
        </>
    )
}
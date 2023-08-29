import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
const CommentItem = ({ comment, handlePostComment, props }) => {
    // const { data } = props

    const [replyText, setReplyText] = useState("");
    // console.log(data)
    const [isReplying, setIsReplying] = useState(false);
    const [postreply, setPostReply] = useState();
    // console.log("Comments", comments)
    const handlePostReply = () => {
        // handlePostComment(replyText, comment.id);
        setPostReply(replyText, comment.id);
        console.log(replyText, comment.id)
        setReplyText("");
        setIsReplying(false); // Close the reply textarea and button after posting
    };

    return (

        <div className="comment">
            {/* <div className="aavtar" ><Avatar username={people.username} userId={people.id} /></div>
                                {people.username}
                                <p>Posted by: {comment.user_name}</p>
                            </div> */}

            <div className="aavtar" style={{ display: 'flex', color: "#999" }}>
                <Avatar username={comment.user_name} userId={comment.id} />
                {comment.user_name}
            </div >
            {/* <p>Posted by: {comment.user_name}</p> */}
            <div style={{ fontSize: '18px', color: "#333" }}>{comment.text}</div>

            {!isReplying && (
                <>
                    {/* <button onClick={() => setIsReplying(true)} className="reply-button">Reply</button> */}
                    <div onClick={() => setIsReplying(true)} style={{ color: "#999", size: "14px" }}>Reply</div>
                    <div style={{ padding: "5px" }}></div>
                </>
            )}
            {isReplying && (
                <>
                    <textarea
                        className="comment-input"
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button className="abc" onClick={handlePostReply}>Post Reply</button>

                </>

            )}

            <div className="nested-comments">
                {/* {comments
                    .filter(nestedComment => nestedComment.parent_id === comment.id)
                    .map(nestedComment => (
                        <CommentItem key={nestedComment.id} comment={nestedComment} />
                    ))} */}
            </div>
        </div>
    );
};

export default CommentItem;

// import React, { useEffect, useState } from 'react'

// const CommentItem = () => {


//     return (
//         <div>
//             CommentItem
//         </div>
//     )
// }

// export default CommentItem

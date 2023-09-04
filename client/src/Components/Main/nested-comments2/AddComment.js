import React, { useState } from 'react'
import axios from "axios";
const AddComment = (props) => {

    const [openReplyCommId, setOpenReplyCommId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const handlePostReply = (reply, commentId) => {
        console.log("qwer", reply, commentId)
        handlePostComment(reply, commentId);
        console.log(reply, commentId);
        setReplyText("");
    }
    const fetchComments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/comments");
            const data = await response.data;
            console.log("comments data", data);
            props?.setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    const handlePostComment = async (text, parent_id = null) => {
        console.log("handlePostComment")

        try {
            const response = await axios.post("http://localhost:5000/api/comments", {
                text,
                user_id: 1,
                user_name: "John Doe",
                parent_id: parent_id,
            });

            if (response.status === 200) {
                fetchComments();
                setOpenReplyCommId(null);
            } else {
                console.error("Error posting comment:", response.statusText);
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };
    return (
        <div>

            {props?.parentId === openReplyCommId ? (<>
                <div className="keyboard">
                    <textarea
                        style={{ width: "95%" }}
                        className="comment-input"
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    {props?.parentId}
                    <button onClick={() => handlePostReply(replyText, props?.parentId)}>
                        Post Reply
                    </button>
                </div> </>) : (
                <div
                    onClick={() => {

                        setOpenReplyCommId(props?.parentId);
                        //  setReplyText("");
                    }}
                    style={{
                        size: "14px",
                        textDecoration: "underline",
                        color: "slategrey",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Reply
                </div>
            )
            }
        </div>

    )
}

export default AddComment

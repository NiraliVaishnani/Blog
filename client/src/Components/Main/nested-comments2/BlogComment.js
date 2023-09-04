import React, { useEffect, useState } from 'react'
import CommentList from './CommentList';
import axios from "axios";

const Comment = () => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    useEffect(() => {
        console.log("useeffect fetchComment");
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/comments");
            const data = await response.data;
            console.log("comments data", data);
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    const handlePostComment = async (text) => {
        try {
            const response = await axios.post("http://localhost:5000/api/comments", {
                text,
                user_id: 1,
                user_name: "John Doe",
                parent_id: null,
            });

            if (response.status === 200) {
                fetchComments();
                setComment("");
            } else {
                console.error("Error posting comment:", response.statusText);
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    }
    return (
        <div>
            <textarea
                className="comment-input"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);

                }}
            />
            <button
                className="comment-button"
                onClick={() => handlePostComment(comment)}
            >
                Post Comment
            </button>
            <div className="comment-list">
                <CommentList comments={comments} setComments={setComments} />
            </div>
        </div>

    )
}

export default Comment

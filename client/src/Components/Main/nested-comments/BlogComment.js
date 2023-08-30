import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/comment.css";
import "../../../css/Blog/Avatar.css";
import EmojiPicker from "emoji-picker-react";
import CommentList from "./CommentList";
const Comment = () => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState("");
  const [comments, setComments] = useState([]);
  const [emojipicker, setemojipicker] = useState(false);
  const [chosenEmoji, setchosenEmoji] = useState(null);
  console.log("emojiPicker", emojipicker);
  console.log("blog component", comments);
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
  const onEmojiClick = (event) => {
    console.log(
      "event.emoji",
      event.emoji,
      event.emoji.codePointAt(0).toString(16)
    );
    const emojiString = event.emoji.codePointAt(0).toString(16);
    setchosenEmoji(event.emoji);
    const tempComment = `${comment}${emojiString}`;
    const tempCommentShow = `${showComment}${event.emoji}`;
    console.log("emojiString", tempComment, "showComment", tempCommentShow);
    const convertToEmoji = String.fromCodePoint("0x" + emojiString);
    setComment(tempComment);
    setShowComment();
    console.log("convertedToEmoji", convertToEmoji);
    // setComment(comment + event.emoji);
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
  };

  return (
    <div className="comment-container">
      <div className="keyboard">
        {chosenEmoji}
        <textarea
          className="comment-input"
          placeholder="Write your comment..."
          value={showComment}
          onChange={(e) => {
            setComment(e.target.value);
            setShowComment(e.target.value);
          }}
        />

        <button
          className="submit-button"
          onClick={() => setemojipicker(!emojipicker)}
        >
          😀
        </button>
        {emojipicker && (
          <EmojiPicker onEmojiClick={(event) => onEmojiClick(event)} />
        )}
      </div>
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
  );
};

export default Comment;

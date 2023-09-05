import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/comment.css";
import "../../../css/Blog/Avatar.css";
import EmojiPicker from "emoji-picker-react";
import CommentList from "./CommentList";
const Comment = () => {
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);
  const [emojipicker, setemojipicker] = useState(false);
  const [chosenEmoji, setchosenEmoji] = useState(null);
  console.log("emojiPicker", emojipicker);
  console.log("blog component", comments);
  useEffect(() => {
    // console.log("useeffect fetchComment", comments);
    fetchComments();
  }, []);

  console.log("useeffect fetchComment", comments);
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
    console.log("emojipicker", emojipicker)
    console.log(
      "event.emoji",
      event.emoji,
      event.emoji.codePointAt(0).toString(16)
    );
    const emojiString = event.emoji.codePointAt(0).toString(16);
    setchosenEmoji(event.emoji);
    const tempCommentShow = `${comment}${event.emoji}`;
    setComment(tempCommentShow);

  };

  const handlePostComment = async (text) => {
    console.log("text", text);
    const unicodeEmojis = Array.from(text)
      .map((char) => char.codePointAt(0).toString(16))
      .join(" ");
    const unicodeValues = unicodeEmojis.split(" ");
    console.log("unicodeValues??????", unicodeValues);
    // Convert each hexadecimal value back to its corresponding character
    const originalText = unicodeValues
      .map((hexValue) => String.fromCodePoint(parseInt(hexValue, 16)))
      .join("");

    console.log("Original Text:", originalText); // Should display the original emojis and text

    try {
      const response = await axios.post("http://localhost:5000/api/comments", {
        text: unicodeEmojis,
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

        <textarea
          className="comment-input"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);

          }}
        />

        <button
          className="submit-button"
          style={{ height: "85px" }}
          onClick={() => { setemojipicker(!emojipicker); console.log("emojipicker", emojipicker) }
          }
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

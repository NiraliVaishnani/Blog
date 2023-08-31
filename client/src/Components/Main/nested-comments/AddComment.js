import axios from "axios";
import React, { useState } from "react";
import "../../../css/comment.css";
import EmojiPicker from "emoji-picker-react";
export const AddComment = (props) => {
  //  console.log("add comment props", props);
  const [openReplyCommId, setOpenReplyCommId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [emojipicker, setemojipicker] = useState(false);
  const [chosenEmoji, setchosenEmoji] = useState(null);
  const handlePostComment = async (text, parent_id = null) => {
    console.log("handlePostComment")
    const unicodeEmojis = Array.from(text)
      .map((char) => char.codePointAt(0).toString(16))
      .join(" ");

    const unicodeValues = unicodeEmojis.split(" ");
    console.log("unicodeValues??????", unicodeValues);
    // // Convert each hexadecimal value back to its corresponding character
    const originalText = unicodeValues
      .map((hexValue) => String.fromCodePoint(parseInt(hexValue, 16)))
      .join("");

    console.log("Original Text:", originalText); // Should display the original emojis and text
    try {
      const response = await axios.post("http://localhost:5000/api/comments", {
        text: unicodeEmojis,
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

  // function to be used to create new reply
  const handlePostReply = (reply, commentId) => {
    console.log("handlePostReply")
    console.log("handle Post", reply, commentId);
    handlePostComment(reply, commentId);
    console.log(reply, commentId);
    setReplyText("");
  };
  const onEmojiClick = (event) => {
    setchosenEmoji(event.emoji);
    const tempCommentShow = `${replyText}${event.emoji}`;
    setReplyText(tempCommentShow);
  };
  console.log("chosenEmoji", chosenEmoji);
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
  return (
    <div>
      {props?.parentId === openReplyCommId ? (
        <>
          <div className="keyboard">
            <textarea
              style={{ width: "95%" }}
              className="comment-input"
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button style={{ height: "85px  " }} onClick={() => setemojipicker(!emojipicker)}> 😀</button>
          </div>
          {/* <EmojiPicker onEmojiClick={onEmojiClick} /> */}
          {emojipicker && (
            <EmojiPicker onEmojiClick={(event) => onEmojiClick(event)} />
          )}
          <button onClick={() => handlePostReply(replyText, props?.parentId)}>
            Post Reply
          </button>{" "}
        </>
      ) : (
        <>
          <div
            onClick={() => {
              console.log("open id", props.parentId);
              setOpenReplyCommId(props?.parentId);
              setReplyText("");
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
          <div style={{ padding: "5px" }}></div>
        </>
      )}
    </div>
  );
};

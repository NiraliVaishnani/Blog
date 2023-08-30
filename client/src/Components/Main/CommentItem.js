import React, { useState } from "react";
import Avatar from "./Avatar";
const CommentItem = ({ comment, handlePostComment, props }) => {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  // function to be used to create new reply
  const handlePostReply = () => {
    console.log("handle Post", replyText, comment.id);
    handlePostComment(replyText, comment.id);
    console.log(replyText, comment.id);
    setReplyText("");
    setIsReplying(false); // Close the reply textarea and button after posting
  };

  return (
    <div className="comment">
      <div className="aavtar" style={{ display: "flex", color: "#999" }}>
        <Avatar username={comment.user_name} userId={comment.id} />
        {comment.user_name}
      </div>
      <div style={{ fontSize: "18px", color: "#333" }}>{comment.text}</div>

      {!isReplying && (
        <>
          <div
            onClick={() => setIsReplying(true)}
            style={{ color: "#999", size: "14px" }}
          >
            Reply
          </div>
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
          <button className="abc" onClick={handlePostReply}>
            Post Reply
          </button>
        </>
      )}

      <div className="nested-comments"></div>
    </div>
  );
};
export default CommentItem;

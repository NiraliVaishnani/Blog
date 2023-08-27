// import React, { useState } from "react";
// import "../../css/comment.css"; // Import your custom CSS file for styling

// export const Comment = () => {
//   const [comment, setComment] = useState("");

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };

//   const handlePostComment = () => {
//     // Implement logic to post the comment to your backend here
//     console.log("Posted comment:", comment);
//     setComment(""); // Clear the input field after posting
//   };

//   return (
//     <>
//       <div className="comment-box">
//         <textarea
//           className="comment-input"
//           placeholder="Write your comment..."
//           value={comment}
//           onChange={handleCommentChange}
//         />
//         <button className="comment-button" onClick={handlePostComment}>
//           Post Comment
//         </button>
//       </div>
//       <div> {comment}</div>
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import "../../css/comment.css"; // Import your custom CSS file for styling

export const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/comments"); // Update with your API endpoint
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
          user_id: 1, // Replace with the actual user ID
          user_name: "John Doe", // Replace with the actual user name
          parent_id: null, // Replace with the actual parent ID if applicable
        }),
      });

      if (response.ok) {
        fetchComments(); // Fetch comments again to update the UI
        setComment(""); // Clear the input field after posting
      } else {
        console.error("Error posting comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <>
      <div className="comment-box">
        <textarea
          className="comment-input"
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button className="comment-button" onClick={handlePostComment}>
          Post Comment
        </button>
      </div>
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            <p>Posted by: {comment.user_name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

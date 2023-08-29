// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";
// import '../../css/Blog/Avatar.css';
// import Avatar from "./Avatar";
// import Picker from 'emoji-picker-react';
// import data from 'emoji-picker-react';

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [replyText, setReplyText] = useState("");
//   const [isReplying, setIsReplying] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [isPickervisible, setIsPickervisible] = useState(false);
//   const [currentEmoji, setCurrentEmoji] = useState(null);
//   useEffect(() => {
//     fetchComments();
//   }, []);
//   console.log(isPickervisible)
//   const fetchComments = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/comments");
//       const data = await response.json();
//       setComments(data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handlePostComment = async (text, parent_id = null) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/comments", {
//         text,
//         user_id: 1,
//         user_name: "John Doe",
//         parent_id: parent_id,
//       });

//       if (response.status === 200) {
//         fetchComments();
//         setComment("");
//       } else {
//         console.error("Error posting comment:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };

//   const CommentItem = ({ comment }) => {
//     console.log(isPickervisible)
//     console.log("zvcg" + isReplying)
//     const handlePostReply = () => {
//       debugger
//       handlePostComment(replyText, comment.id);
//       setReplyText("");
//       setIsReplying(false);
//     };
//     const showHide = () => {
//       debugger
//       setIsPickervisible(!isPickervisible)
//     }

//     return (

//       <div className="comment">
//         <div className="aavtar" style={{ display: 'flex', color: "#999" }}>
//           <Avatar username={comment.user_name} userId={comment.id} />
//           {comment.user_name}
//         </div >

//         <div style={{ fontSize: '18px', color: "#333" }}>{comment.text}</div>



//         {!isReplying && (
//           <>
//             {/* <button onClick={() => setIsReplying(true)} className="reply-button">Reply</button> */}
//             <div onClick={() => setIsReplying(true)} style={{ color: "#999", size: "14px" }}>Reply</div>
//             <div style={{ padding: "5px" }}></div>
//           </>
//         )}
//         {isReplying && (
//           <>

//             <div className="keyboard">
//               <div>
//                 <textarea
//                   className="comment-input"
//                   placeholder="Write your reply..."
//                   value={replyText}
//                   onChange={(e) => setReplyText(e.target.value)}
//                 />
//               </div>
//               <button type="button" className="emoji-picker" onClick={showHide}>
//                 Emoji Picker</button>
//             </div>


//             {/* <button className="abc" onClick={(e) => { e.stopPropagation(); handlePostReply }}>Post Reply</button> */}
//             <button type="button" className="abc" onClick={handlePostReply}>Post Reply</button>
//             {isPickervisible && (
//               <div>
//                 <Picker
//                   data={data}
//                   previewPosition="none"
//                   onEmojiSelect={(e) => {

//                     // setCurrentEmoji(e.native);
//                     //  setIsPickervisible(false);
//                   }
//                   }
//                 />
//               </div>
//             )}

//           </>

//         )
//         }

//         <div className="nested-comments">
//           {comments
//             .filter(nestedComment => nestedComment.parent_id === comment.id)
//             .map(nestedComment => (
//               <CommentItem key={nestedComment.id} comment={nestedComment} />
//             ))}
//         </div>
//       </div >
//     );
//   };

//   return (
//     <div className="comment-container">
//       <textarea
//         className="comment-input"
//         placeholder="Write your comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <button className="comment-button" onClick={() => handlePostComment(comment)}>
//         Post Comment
//       </button>

//       <div className="comment-list">
//         {comments.filter(comment => comment.parent_id === null).map((comment) => (
//           <CommentItem key={comment.id} comment={comment} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comment;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../css/comment.css";
import '../../css/Blog/Avatar.css';
import Avatar from "./Avatar";
import CommentItem from './CommentItem'
const Comment = () => {
  console.log("hyyy")
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    fetchComments();

  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/comments");
      const data = await response.data;
      console.log(data);
      setComments(data);
      setData(data);

    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async (text, parent_id = null) => {
    try {
      const response = await axios.post("http://localhost:5000/api/comments", {
        text,
        user_id: 1,
        user_name: "John Doe",
        parent_id: parent_id,
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
  const handlecomment = comments;
  console.log("handleComment", handlecomment);

  // console.log("Comments", comments);
  return (

    <div className="comment-container">
      <textarea
        className="comment-input"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="comment-button" onClick={() => handlePostComment(comment)}>
        Post Comment
      </button>

      <div className="comment-list">
        {comments.filter(comment => comment.parent_id === null).map((comment) => (
          <CommentItem key={comment.id} comment={comment} handlePostComment={handlePostComment} data={data} />

        ))}

      </div>
    </div>
  );
};

export default Comment;






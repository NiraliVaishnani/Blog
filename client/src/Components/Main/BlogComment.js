// // // // import React, { useState, useEffect } from "react";
// // // // import "../../css/comment.css"; // Import your custom CSS file for styling

// // // // const Comment = () => {
// // // //   const [comment, setComment] = useState("");
// // // //   const [comments, setComments] = useState([]);
// // // //   const [parentId, setParentId] = useState('')
// // // //   const [showReplyForm, setShowReplyForm] = useState(false);
// // // //   const [replyText, setReplyText] = useState('');

// // // //   useEffect(() => {
// // // //     fetchComments();
// // // //   }, []);

// // // //   const fetchComments = async () => {
// // // //     try {
// // // //       const response = await fetch("http://localhost:5000/api/comments"); // Update with your API endpoint
// // // //       const data = await response.json();
// // // //       setComments(data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching comments:", error);
// // // //     }
// // // //   };

// // // //   const handleCommentChange = (event) => {
// // // //     setComment(event.target.value);
// // // //   };
// // // //   const handleReplyTextChange = (event) => {
// // // //     setReplyText(event.target.value);
// // // //     // setShowReplyForm(false);
// // // //   };

// // // //   const handlePostComment = async () => {
// // // //     try {
// // // //       const response = await fetch("http://localhost:5000/api/comments", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify({
// // // //           text: comment,
// // // //           user_id: 1, // Replace with the actual user ID
// // // //           user_name: "John Doe", // Replace with the actual user name
// // // //           parent_id: parentId, // Replace with the actual parent ID if applicable
// // // //         }),
// // // //       });

// // // //       if (response.ok) {
// // // //         fetchComments(); // Fetch comments again to update the UI
// // // //         setComment(""); // Clear the input field after posting
// // // //       } else {
// // // //         console.error("Error posting comment:", response.statusText);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error posting comment:", error);
// // // //     }
// // // //   };
// // // //   const handleReplyClick = (commentId) => {
// // // //     setShowReplyForm(true);
// // // //     setParentId(commentId);

// // // //   };
// // // //   return (
// // // //     <>

// // // //       <textarea
// // // //         className="comment-input"
// // // //         placeholder="Write your comment..."
// // // //         value={comment}
// // // //         onChange={handleCommentChange}
// // // //       />
// // // //       {/* <button className="comment-button" onClick={handlePostComment}>
// // // //          Post Comment
// // // //        </button> */}

// // // //       <button className="comment-button" onClick={handlePostComment}>
// // // //         {showReplyForm ? "Post Reply" : "Post Comment"}
// // // //       </button>

// // // //       <div className="comment-list">
// // // //         {comments.map((comment) => (
// // // //           <>
// // // //             <div key={comment.id} className="comment">
// // // //               <p>{comment.text}</p>
// // // //               <p>Posted by: {comment.user_name}</p>
// // // //             </div>
// // // //             <button className="reply-button" onClick={() => handleReplyClick(comment.id)}>
// // // //               Reply
// // // //             </button>
// // // //             {parentId === comment.id && (
// // // //               <div className="nested-comment">
// // // //                 <textarea
// // // //                   className="comment-input"
// // // //                   placeholder="Write your comment..."
// // // //                   value={comment}
// // // //                   onChange={handleCommentChange}
// // // //                 />

// // // //                 <button className="comment-button" onClick={handlePostComment}>
// // // //                   Post Comment
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         ))}
// // // //       </div>



// // // //     </>
// // // //   );
// // // // };
// // // // export default Comment


// // // // import React, { useState, useEffect } from "react";
// // // // import axios from 'axios';
// // // // import "../../css/comment.css";
// // // // const Comment = () => {
// // // //   const [comment, setComment] = useState("");
// // // //   const [comments, setComments] = useState([]);
// // // //   const [parentId, setParentId] = useState('')
// // // //   const [showReplyForm, setShowReplyForm] = useState(false);


// // // //   useEffect(() => {
// // // //     fetchComments();
// // // //   }, []);

// // // //   const fetchComments = async () => {
// // // //     try {
// // // //       const response = await fetch("http://localhost:5000/api/comments"); // Update with your API endpoint
// // // //       const data = await response.json();
// // // //       setComments(data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching comments:", error);
// // // //     }
// // // //   };
// // // //   const handleReply = (parentid) => {
// // // //     setShowReplyForm(true);
// // // //     setComment("");
// // // //     setParentId(parentid);
// // // //     console.log("Parentid", parentid);
// // // //   }
// // // //   const handlePostComment = async () => {
// // // //     try {
// // // //       const response = await axios.post("http://localhost:5000/api/comments", {
// // // //         text: comment,
// // // //         user_id: 1,
// // // //         user_name: "John Doe",
// // // //         parent_id: null,
// // // //       });

// // // //       if (response.status === 200) {
// // // //         fetchComments();
// // // //         setComment("");
// // // //         setShowReplyForm(false);
// // // //         setParentId('');
// // // //       } else {
// // // //         console.error("Error posting comment:", response.statusText);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error posting comment:", error);
// // // //     }
// // // //   };


// // // //   return (
// // // //     <>
// // // //       {parentId == '' ? (<>
// // // //         < textarea
// // // //           className="comment-input"
// // // //           placeholder="Write your comment..."
// // // //           value={comment}
// // // //           onChange={(e) => setComment(e.target.value)}
// // // //         />
// // // //         <button className="comment-button" onClick={handlePostComment}>
// // // //           {showReplyForm ? "Post Reply" : "Post Comment"}
// // // //         </button>

// // // //         <div className="comment-list">
// // // //           {comments.map((comment, index) => (
// // // //             <>
// // // //               <div key={index} className={parentId === comment.parent_id ? "nested-comment" : "comment"}>
// // // //                 <p>{comment.text}</p>
// // // //                 <p>Posted by: {comment.user_name}</p>
// // // //               </div>
// // // //               <button onClick={() => handleReply(comment.id)}>Reply</button>
// // // //             </>
// // // //           ))}
// // // //         </div></>) : (<>
// // // //           <span
// // // //             style={{ wordWrap: "break-word" }}
// // // //           >
// // // //             {comment.name}
// // // //           </span>
// // // //         </>)


// // // //       }
// // // //       < div className="nested2-comment">
// // // //         {comment?.items?.map((comment, index) => {
// // // //           return <Comment key={comment.id} />
// // // //         })}
// // // //       </div >
// // // //     </>

// // // //   )



// // // // };



// // // // export default Comment






// // // import React, { useState, useEffect } from "react";
// // // import axios from 'axios';
// // // import "../../css/comment.css";


// // // const Comment = () => {
// // //   const [comment, setComment] = useState("");
// // //   const [comments, setComments] = useState([]);

// // //   useEffect(() => {
// // //     fetchComments();
// // //   }, []);

// // //   const fetchComments = async () => {
// // //     try {
// // //       const response = await fetch("http://localhost:5000/api/comments");
// // //       const data = await response.json();
// // //       setComments(data);
// // //     } catch (error) {
// // //       console.error("Error fetching comments:", error);
// // //     }
// // //   };

// // //   const handlePostComment = async (parent_id = null) => {
// // //     try {
// // //       const response = await axios.post("http://localhost:5000/api/comments", {
// // //         text: comment,
// // //         user_id: 1,
// // //         user_name: "John Doe",
// // //         parent_id: parent_id,
// // //       });

// // //       if (response.status === 200) {
// // //         fetchComments();
// // //         setComment("");
// // //       } else {
// // //         console.error("Error posting comment:", response.statusText);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error posting comment:", error);
// // //     }
// // //   };

// // //   // Helper function to get nested comments for a parent comment id
// // //   const getNestedComments = (parentCommentId) => {
// // //     return comments.filter(comment => comment.parent_id === parentCommentId);
// // //   };

// // //   return (
// // //     <div className="comment-container">
// // //       <textarea
// // //         className="comment-input"
// // //         placeholder="Write your comment..."
// // //         value={comment}
// // //         onChange={(e) => setComment(e.target.value)}
// // //       />
// // //       <button className="comment-button" onClick={() => handlePostComment()}>
// // //         Post Comment
// // //       </button>

// // //       <div className="comment-list">
// // //         {comments.filter(comment => comment.parent_id === null).map((comment) => (
// // //           <div key={comment.id} className="comment">
// // //             <p>{comment.text}</p>
// // //             <p>Posted by: {comment.user_name}</p>
// // //             <button onClick={() => handlePostComment(comment.id)}>Reply</button>
// // //             <div className="nested-comments">
// // //               {getNestedComments(comment.id).map((nestedComment) => (
// // //                 <>
// // //                   <Comment key={nestedComment.id}></Comment>
// // //                   <div key={nestedComment.id} className="comment nested-comment">
// // //                     <p>{nestedComment.text}</p>
// // //                     <p>Posted by: {nestedComment.user_name}</p>
// // //                   </div>
// // //                 </>

// // //               ))}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div >
// // //   );
// // // };

// // // export default Comment;
// // import React, { useState, useEffect } from "react";
// // import axios from 'axios';
// // import "../../css/comment.css";

// // const Comment = () => {
// //   const [comment, setComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [replyMode, setReplyMode] = useState(false); // New state to track reply mode

// //   useEffect(() => {
// //     fetchComments();
// //   }, []);

// //   const fetchComments = async () => {
// //     try {
// //       const response = await fetch("http://localhost:5000/api/comments");
// //       const data = await response.json();
// //       setComments(data);
// //     } catch (error) {
// //       console.error("Error fetching comments:", error);
// //     }
// //   };

// //   const handlePostComment = async (parent_id = null) => {
// //     try {
// //       const response = await axios.post("http://localhost:5000/api/comments", {
// //         text: comment,
// //         user_id: 1,
// //         user_name: "John Doe",
// //         parent_id: parent_id,
// //       });

// //       if (response.status === 200) {
// //         fetchComments();
// //         setComment("");
// //         setReplyMode(false); // Reset reply mode after posting
// //       } else {
// //         console.error("Error posting comment:", response.statusText);
// //       }
// //     } catch (error) {
// //       console.error("Error posting comment:", error);
// //     }
// //   };

// //   return (
// //     <div className="comment-container">
// //       <textarea
// //         className="comment-input"
// //         placeholder="Write your comment..."
// //         value={comment}
// //         onChange={(e) => setComment(e.target.value)}
// //       />
// //       <button className="comment-button" onClick={() => handlePostComment()}>
// //         Post Comment
// //       </button>

// //       <div className="comment-list">
// //         {comments.filter(comment => comment.parent_id === null).map((comment) => (
// //           <div key={comment.id} className="comment">
// //             <p>{comment.text}</p>
// //             <p>Posted by: {comment.user_name}</p>
// //             {!replyMode && (
// //               <button onClick={() => setReplyMode(comment.id)}>Reply</button>
// //             )}
// //             {replyMode === comment.id && (
// //               <>
// //                 <textarea
// //                   className="comment-input"
// //                   placeholder="Write your reply..."
// //                   value={comment}
// //                   onChange={(e) => setComment(e.target.value)}
// //                 />
// //                 <button onClick={() => handlePostComment(comment.id)}>Post Reply</button>
// //               </>
// //             )}
// //             <div className="nested-comments">
// //               {comments
// //                 .filter(nestedComment => nestedComment.parent_id === comment.id)
// //                 .map(nestedComment => (
// //                   <div key={nestedComment.id} className="comment nested-comment">
// //                     <p>{nestedComment.text}</p>
// //                     <p>Posted by: {nestedComment.user_name}</p>
// //                   </div>
// //                 ))}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Comment;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [replyMode, setReplyMode] = useState({ id: null, text: "" });
//   const [replyMode2, setReplyMode2] = useState({ id: null, text: "" });

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/comments");
//       const data = await response.json();
//       setComments(data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handlePostComment = async (parent_id = null) => {
//     try {
//       let replyText = "";
//       if (replyMode && replyMode.id === parent_id) {
//         replyText = replyMode.text;
//         setReplyMode({ id: null, text: "" }); // Reset reply mode after posting
//       }

//       const response = await axios.post("http://localhost:5000/api/comments", {
//         // text: comment,
//         text: replyText || comment,
//         user_id: 1,
//         user_name: "John Doe",
//         parent_id: parent_id,
//       });

//       if (response.status === 200) {
//         fetchComments();
//         setComment("");
//         setReplyMode({ id: null, text: "" }); // Reset reply mode after posting
//       } else {
//         console.error("Error posting comment:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };
//   //console.log("reply mode: " + replyMode)
//   return (
//     <div className="comment-container">
//       <textarea
//         className="comment-input"
//         placeholder="Write your comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <button className="comment-button" onClick={() => handlePostComment()}>
//         Post Comment
//       </button>

//       <div className="comment-list">
//         {comments.filter(comment => comment.parent_id === null).map((comment) => (
//           <div key={comment.id} className="comment">
//             <p>{comment.text}</p>
//             <p>Posted by: {comment.user_name}</p>
//             {!replyMode.id && (
//               <button onClick={() => setReplyMode({ id: comment.id, text: "" })}>
//                 Reply
//               </button>
//             )}
//             {replyMode.id === comment.id && (
//               <>
//                 <textarea
//                   className="comment-input"
//                   placeholder="Write your reply..."
//                   value={replyMode.text}
//                   onChange={(e) =>
//                     setReplyMode({ id: comment.id, text: e.target.value })
//                   }
//                 />
//                 <button onClick={() => handlePostComment(comment.id)}>Post Reply</button>
//               </>
//             )}
//             <div className="nested-comments">
//               {comments
//                 .filter(nestedComment => nestedComment.parent_id === comment.id)
//                 .map(nestedComment => (
//                   <div key={nestedComment.id} className="comment nested-comment">
//                     <p>{nestedComment.text}</p>
//                     <p>Posted by: {nestedComment.user_name}</p>

//                     <button onClick={() => setReplyMode2({ id: nestedComment.id, text: "" })} > Reply</button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comment;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [replyMode, setReplyMode] = useState({ id: null, text: "" });
//   const [replyMode2, setReplyMode2] = useState({ id: null, text: "" });


//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/comments");
//       const data = await response.json();
//       setComments(data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handlePostComment = async (parent_id = null) => {
//     try {
//       let replyText = "";
//       if (replyMode && replyMode.id === parent_id) {
//         replyText = replyMode.text;
//         setReplyMode({ id: null, text: "" });
//       }
//       let replytext2 = "";
//       if (replyMode2 && replyMode2.id === parent_id) {
//         replytext2 = replyMode2.text;
//         setReplyMode2({ id: null, text: "" });
//       }

//       const response = await axios.post("http://localhost:5000/api/comments", {
//         //  text: replyText || comment,
//         text: replyText || replytext2 || comment,
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

//   return (
//     <div className="comment-container">
//       <textarea
//         className="comment-input"
//         placeholder="Write your comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <button className="comment-button" onClick={() => handlePostComment()}>
//         Post Comment
//       </button>

//       <div className="comment-list">
//         {comments.filter(comment => comment.parent_id === null).map((comment) => (
//           <div key={comment.id} className="comment">
//             <p>{comment.text}</p>
//             <p>Posted by: {comment.user_name}</p>
//             {!replyMode.id && (
//               <button onClick={() => setReplyMode({ id: comment.id, text: "" })}>
//                 Reply
//               </button>
//             )}
//             {replyMode.id === comment.id && (
//               <>
//                 <textarea
//                   className="comment-input"
//                   placeholder="Write your reply..."
//                   value={replyMode.text}
//                   onChange={(e) =>
//                     setReplyMode({ id: comment.id, text: e.target.value })
//                   }
//                 />
//                 <button onClick={() => handlePostComment(comment.id)}>Post Reply</button>
//               </>
//             )}
//             <div className="nested-comments">
//               {comments
//                 .filter(nestedComment => nestedComment.parent_id === comment.id)
//                 .map(nestedComment => (
//                   <div key={nestedComment.id} className="comment nested-comment">
//                     <p>{nestedComment.text}</p>
//                     <p>{nestedComment.id}</p>

//                     <p>Posted by: {nestedComment.user_name}</p>
//                     {!replyMode2.id && (
//                       <button onClick={() => setReplyMode2({ id: nestedComment.id, text: "" })}>
//                         Reply
//                       </button>
//                     )}
//                     {replyMode2.id === nestedComment.id && (
//                       <>
//                         <textarea
//                           className="comment-input"
//                           placeholder="Write your reply..."
//                           value={replyMode2.text}
//                           onChange={(e) =>
//                             setReplyMode2({ id: nestedComment.id, text: e.target.value })
//                           }
//                         />
//                         <button onClick={() => handlePostComment(nestedComment.id)}>Post Reply</button>
//                       </>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comment;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     fetchComments();
//   }, []);

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
//     const [replyText, setReplyText] = useState("");

//     const handlePostReply = () => {
//       handlePostComment(replyText, comment.id);
//       setReplyText("");
//     };

//     return (
//       <div className="comment">
//         <p>{comment.text}</p>
//         <p>Posted by: {comment.user_name}</p>
//         <button onClick={() => setReplyText("")}>Reply</button>

//         {replyText && (
//           <>
//             <textarea
//               className="comment-input"
//               placeholder="Write your reply..."
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//             />
//             <button onClick={handlePostReply}>Post Reply</button>
//           </>
//         )}
//         <div className="nested-comments">
//           {comments
//             .filter(nestedComment => nestedComment.parent_id === comment.id)
//             .map(nestedComment => (
//               <CommentItem key={nestedComment.id} comment={nestedComment} />
//             ))}
//         </div>
//       </div>
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


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     fetchComments();
//   }, []);

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
//     const [replyText, setReplyText] = useState("");

//     const handlePostReply = () => {
//       console.log("????????????????")
//       handlePostComment(replyText, comment.id);
//       setReplyText("");
//     };

//     return (
//       <div className="comment">
//         <p>{comment.text}</p>
//         <p>Posted by: {comment.user_name}</p>
//         <button onClick={() => setReplyText("")}>Reply</button>
//         {replyText && (
//           <>
//             <textarea
//               className="comment-input"
//               placeholder="Write your reply..."
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//             />
//             <button className="abc" onClick={handlePostReply}>Post Reply</button>

//           </>
//         )}
//         <div className="nested-comments">
//           {comments
//             .filter(nestedComment => nestedComment.parent_id === comment.id)
//             .map(nestedComment => (
//               <CommentItem key={nestedComment.id} comment={nestedComment} />
//             ))}
//         </div>
//       </div>
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
const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/comments");
      const data = await response.json();
      setComments(data);
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

  const CommentItem = ({ comment }) => {
    const [replyText, setReplyText] = useState("");
    const [isReplying, setIsReplying] = useState(false);

    const handlePostReply = () => {
      handlePostComment(replyText, comment.id);
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
          {comments
            .filter(nestedComment => nestedComment.parent_id === comment.id)
            .map(nestedComment => (
              <CommentItem key={nestedComment.id} comment={nestedComment} />
            ))}
        </div>
      </div>
    );
  };

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
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comment;

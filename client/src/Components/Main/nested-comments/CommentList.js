// import React, { useState } from "react";
// import Avatar from "../Avatar";
// import { ChildComments } from "./ChildComments";
// import { AddComment } from "./AddComment";
// import humanizeDuration from 'humanize-duration';
// const CommentList = ({ comments, setComments, key }) => {

//   const [childRepliesShow, setchildRepliesShow] = useState(false)
//   const [openChild, setOpenChild] = useState(null);
//   console.log("ReplyShow", childRepliesShow)
//   const formattedDuration = (timestamp) => {
//     const createdAt = new Date(timestamp);
//     const now = new Date()
//     const duration = now - createdAt;
//     const humanize = humanizeDuration(duration, {
//       round: true,
//       largest: 1, // Show only the largest unit (e.g., "2 days" instead of "2 days 4 hours")
//     });
//     return humanize;
//   }
//   const originalform = (hex) => {

//     const unicodeValues = hex.split(" ");

//     const originalText = unicodeValues
//       .map((hexValue) => String.fromCodePoint(parseInt(hexValue, 16)))
//       .join("");
//     return originalText;


//   }
//   return (
//     <>
//       {comments?.map((com) => (
//         <>
//           {com.parent_id === null ? (
//             <div className="comment">
//               <div
//                 className="aavtar"
//                 style={{ display: "flex", color: "#999" }}
//               >
//                 <Avatar username={com.user_name} userId={com.id} />
//                 {com.user_name}

//                 &nbsp;&nbsp;
//                 Posted {formattedDuration(com.createdAt)} ago
//               </div>

//               {/* <div style={{ fontSize: "18px", color: "#333" }}>{com.text}</div> */}
//               <div style={{ fontSize: "18px", color: "#333" }}>{originalform(com.text)}</div>

//               <AddComment parentId={com.id} setComments={setComments} />
//               {openChild === com.id && childRepliesShow ? <ChildComments
//                 comments={comments}
//                 parentId={com.id}
//                 setComments={setComments}
//               /> : null}
//               <button onClick={() => {
//                 console.log("com.parent_id", com.id);
//                 setOpenChild(com.id)
//                 setchildRepliesShow(!childRepliesShow)
//                 console.log("childRepliesShow", childRepliesShow)
//                 //  toggleChildRepliesShow(com.id)
//               }}>Show reply</button>

//             </div>
//           ) : null}
//         </>
//       ))}
//     </>
//   );
// };
// export default CommentList;



import React, { useState } from "react";
import Avatar from "../Avatar";
import { ChildComments } from "./ChildComments";
import { AddComment } from "./AddComment";
import humanizeDuration from 'humanize-duration';
const CommentList = ({ comments, setComments, key }) => {

  const [childRepliesShow, setchildRepliesShow] = useState({})
  const [openChild, setOpenChild] = useState(null);
  console.log("ReplyShow", childRepliesShow)
  const formattedDuration = (timestamp) => {
    const createdAt = new Date(timestamp);
    const now = new Date()
    const duration = now - createdAt;
    const humanize = humanizeDuration(duration, {
      round: true,
      largest: 1, // Show only the largest unit (e.g., "2 days" instead of "2 days 4 hours")
    });
    return humanize;
  }
  const originalform = (hex) => {

    const unicodeValues = hex.split(" ");

    const originalText = unicodeValues
      .map((hexValue) => String.fromCodePoint(parseInt(hexValue, 16)))
      .join("");
    return originalText;
  }

  const toggleChildReplies = (commentId) => {
    setchildRepliesShow((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  }
  return (
    <>
      {comments?.map((com) => (
        <>
          {com.parent_id === null ? (
            <div className="comment">
              <div
                className="aavtar"
                style={{ display: "flex", color: "#999" }}
              >
                <Avatar username={com.user_name} userId={com.id} />
                {com.user_name}

                &nbsp;&nbsp;
                Posted {formattedDuration(com.createdAt)} ago
              </div>

              {/* <div style={{ fontSize: "18px", color: "#333" }}>{com.text}</div> */}
              <div style={{ fontSize: "18px", color: "#333" }}>{originalform(com.text)}</div>

              <AddComment parentId={com.id} setComments={setComments} />
              {/* {openChild === com.id && childRepliesShow ? <ChildComments
                comments={comments}
                parentId={com.id}
                setComments={setComments}
              /> : null}
              <button onClick={() => {
                console.log("com.parent_id", com.id);
                setOpenChild(com.id)
                setchildRepliesShow(!childRepliesShow)
                console.log("childRepliesShow", childRepliesShow)
                //  toggleChildRepliesShow(com.id)
              }}>Show reply</button> */}
              <button
                onClick={() => toggleChildReplies(com.id)}
              >
                {childRepliesShow[com.id] ? "Hide Replies" : "Show Replies"}
              </button>
              {childRepliesShow[com.id] ? (
                <ChildComments
                  comments={comments}
                  parentId={com.id}
                  setComments={setComments}
                />
              ) : null}

            </div>
          ) : null}
        </>
      ))}
    </>
  );
};
export default CommentList;

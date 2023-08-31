import React from "react";
import Avatar from "../Avatar";
import { ChildComments } from "./ChildComments";
import { AddComment } from "./AddComment";
const CommentList = ({ comments, setComments }) => {
  // console.log("list component comments", comments, comments.length);
  const originalform = (hex) => {
    console.log("hex", hex);
    const unicodeValues = hex.split(" ");
    console.log("unicodeValues", unicodeValues)


    const originalText = unicodeValues
      .map((hexValue) => String.fromCodePoint(parseInt(hexValue, 16)))
      .join("");
    return originalText;


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
              </div>

              {/* <div style={{ fontSize: "18px", color: "#333" }}>{com.text}</div> */}
              <div style={{ fontSize: "18px", color: "#333" }}>{originalform(com.text)}</div>
              <AddComment parentId={com.id} setComments={setComments} />

              <ChildComments
                comments={comments}
                parentId={com.id}
                setComments={setComments}
              />
            </div>
          ) : null}
        </>
      ))}
    </>
  );
};
export default CommentList;

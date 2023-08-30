import React, { useEffect, useState } from "react";
import { AddComment } from "./AddComment";
import Avatar from "../Avatar";

export const ChildComments = (props) => {
  //  console.log("reply props", props);
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    const childReplies = props.comments?.filter(
      (ele) => ele.parent_id === props.parentId
    );
    console.log("childReplies", childReplies, props?.comments, props?.parentId);
    setReplies(childReplies);
  }, [props.comments, props.parentId]);
  return (
    <div className="nested-comments">
      {replies.length > 0 &&
        replies?.map((reply) => (
          <>
            <div className="aavtar" style={{ display: "flex", color: "#999" }}>
              <Avatar username={reply.user_name} userId={reply.id} />
              {reply.user_name}
            </div>
            <div style={{ fontSize: "18px", color: "#333" }}>
              {reply.text}
              <AddComment
                parentId={reply.id}
                setComments={props?.setComments}
              />
            </div>
            <ChildComments
              comments={props?.comments}
              parentId={reply.id}
              setComments={props?.setComments}
            />
          </>
        ))}
    </div>
  );
};

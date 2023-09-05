import React, { useEffect, useState } from "react";
import { AddComment } from "./AddComment";
import Avatar from "../Avatar";
import humanizeDuration from 'humanize-duration';

export const ChildComments = (props) => {
  console.log("index", props.index)
  //  console.log("reply props", props);
  const [replies, setReplies] = useState([]);

  const formatTimestamp = (timestamp) => {

    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust this to format the time as needed
  };
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
    // console.log("hex", hex);
    const unicodeValues = hex.split(" ");
    // console.log("unicodeValues", unicodeValues)
    const originalText = unicodeValues
      .map((hexValue) => String.fromCodePoint(parseInt(hexValue, 16)))
      .join("");
    return originalText;


  }
  useEffect(() => {

    const childReplies = props.comments?.filter(
      (ele) => ele.parent_id === props.parentId
    );
    // console.log("childReplies", childReplies, props?.comments, props?.parentId);
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
              &nbsp;&nbsp;
              Posted {formattedDuration(reply.createdAt)} ago

            </div>
            <div style={{ fontSize: "18px", color: "#333" }}>
              {/* {reply.text} */}
              {originalform(reply.text)}

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

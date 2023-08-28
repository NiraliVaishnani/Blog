import React, { useState } from "react";
import Comment from "./BlogComment"; // Import your Comment component

const ParentComponent = () => {
    const [comments, setComments] = useState([]);

    const updateComments = (newComments) => {
        setComments(newComments);
    };

    return (
        <div>
            <Comment updateComments={updateComments} comments={comments} />
        </div>
    );
};

export default ParentComponent;

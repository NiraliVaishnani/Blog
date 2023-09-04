import React from 'react'
import AddComment from './AddComment'

const CommentList = ({ comments, setComments }) => {
    console.log("comments", comments)
    return (
        <div>
            {/* {comments?.map((com) => (<>
            {com.id}
            </>)} */}

            {comments?.map((com) => (<>
                <div>
                    {com.text}
                    <AddComment parentId={com.id} setComments={setComments} />
                </div>

            </>))}
        </div>
    )

}

export default CommentList

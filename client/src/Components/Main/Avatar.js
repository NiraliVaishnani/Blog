import React from 'react'
import '../../css/Blog/Avatar.css'
const Avatar = (props) => {

    const { userId, username } = props;
    console.log("nmnm", userId, username)
    const colors = ['bg-red-200', 'bg-teal-200', 'bg-yellow-200']
    const userIdBase10 = parseInt(userId, 10)
    const colorIndex = userIdBase10 % colors.length
    const color = colors[colorIndex];

    return (
        <div className={`avatar ${color}`}>
            {username[0]}
        </div>
    )
}

export default Avatar

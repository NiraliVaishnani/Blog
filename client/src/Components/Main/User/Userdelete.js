import React from 'react'

const Userdelete = (props) => {
    const handleDelete = async () => {
        console.log('delete')
        fetch(`http://localhost:5000/api/userprofile/${props.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));

        props.fetchProfiles()
    }
    return (
        <>
            <button className="deleteButton" onClick={handleDelete}>Delete</button></>
    )
}

export default Userdelete

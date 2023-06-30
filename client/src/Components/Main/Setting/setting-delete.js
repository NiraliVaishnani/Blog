import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const Settingdelete = (props) => {

    const handleDelete = async () => {
        fetch(`http://localhost:5000/api/setting/${props.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(props.fetchSetting())
                props.fetchSetting()
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <button className="deleteButton" onClick={handleDelete}>Delete</button></>
    )
}

export default Settingdelete

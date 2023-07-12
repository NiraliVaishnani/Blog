import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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

        <FontAwesomeIcon onClick={handleDelete} className="deleteButton" icon={faTrash} />

    )
}

export default Settingdelete

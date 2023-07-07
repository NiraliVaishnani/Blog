import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

const RoleDelete = (props) => {
    const handleDelete = async () => {
        fetch(`http://localhost:5000/api/userrole/${props.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                props.fetchRoles();
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <FontAwesomeIcon className="deleteButton" icon={faTrash} />

        </>
    );
}

export default RoleDelete;


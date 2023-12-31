import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

const Countrydelete = (props) => {

    const handleDelete = async () => {
        fetch(`http://localhost:5000/api/country/${props.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(props.fetchSetting())

            })
            .catch(error => console.log(error));
        props.fetchCountry()
    }
    return (

        <FontAwesomeIcon className="deleteButton" icon={faTrash} onClick={handleDelete} />
    )
}

export default Countrydelete



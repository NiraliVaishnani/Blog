import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';

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
        <>
            <button className="deleteButton" onClick={handleDelete}>Delete</button></>
    )
}

export default Countrydelete



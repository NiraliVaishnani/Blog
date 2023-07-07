import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

const CityDelete = ({ id, fetchCities }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/city/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('City deleted successfully.');
                fetchCities(); // Fetch updated list of cities
            } else {
                throw new Error('Error deleting city.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <FontAwesomeIcon className="deleteButton" icon={faTrash} onClick={handleDelete} />
    );
};

export default CityDelete;

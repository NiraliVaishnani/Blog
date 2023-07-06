import React from 'react';

const StateDelete = ({ id, fetchStates }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/state/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('State deleted successfully.');
                fetchStates(); // Fetch updated list of states
            } else {
                throw new Error('Error deleting state.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button className="deleteButton" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default StateDelete;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Statesave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/state/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setName(data.name);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = id
                ? `http://localhost:5000/api/state/${id}`
                : 'http://localhost:5000/api/state';

            const response = await fetch(url, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                console.log('State saved successfully.');
                navigate('/state');
            } else {
                throw new Error('Error saving state.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="email-template-list-container">
            <form onSubmit={handleSubmit}>
                {id ? <h2>Edit State</h2> : <h2>Add State</h2>}
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="add-template-button2">
                    {id ? 'Save Changes' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Statesave;


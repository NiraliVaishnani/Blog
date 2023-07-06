import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const Countrysave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    // const [body, setBody] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/country/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setName(data.subject);

                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = id ? `http://localhost:5000/api/country/${id}` : 'http://localhost:5000/api/country';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();

            console.log(data);
            navigate(`/country`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="email-template-list-container">
            <form onSubmit={handleSubmit}>
                {id ? <h2>Edit Country</h2> : <h2>Add Country</h2>}
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <button type="submit" className="add-template-button2">
                    {id ? 'Save Changes' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default Countrysave

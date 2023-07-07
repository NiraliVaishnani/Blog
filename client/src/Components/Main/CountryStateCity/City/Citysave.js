import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Citysave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/city/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setName(data.name);
                    setSelectedState(data.stateId)
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Submit`)

        try {
            const url = id
                ? `http://localhost:5000/api/city/${id}`
                : 'http://localhost:5000/api/city';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, stateId: selectedState }),
            });

            if (response.ok) {
                console.log('City saved successfully.');
                navigate('/city');
            } else {
                throw new Error('Error saving city.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleStateChange = (event) => {
        const stateId = event.target.value;
        setSelectedState(stateId);
        setSelectedCity('');

        // Fetch the corresponding cities for the selected state
        fetch(`http://localhost:5000/api/address/city/${stateId}`)
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => {
                console.error('Error fetching cities:', error);
            });
    };

    useEffect(() => {
        // Fetch the list of state from the backend API
        fetch('http://localhost:5000/api/state')
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);


    return (
        <div className="email-template-list-container">
            <form onSubmit={handleSubmit}>
                <label>
                    State:
                    <select value={selectedState} onChange={handleStateChange} >
                        <option value="">Select State</option>
                        {states.map(state => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                    </select>
                </label>
                {id ? <h2>Edit City</h2> : <h2>Add City</h2>}
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

export default Citysave;


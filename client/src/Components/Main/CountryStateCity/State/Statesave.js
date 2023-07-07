import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Statesave = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/state/${id}`)
                .then((response) => response.json())

                .then((data) => {

                    setName(data.name);
                    setSelectedCountry(data.countryId);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    useEffect(() => {
        // Fetch the list of countries from the backend API
        fetch('http://localhost:5000/api/address/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

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
                body: JSON.stringify({ name, countryId: selectedCountry }),
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
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Country:
                    <select value={selectedCountry} onChange={handleCountryChange}>

                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                    </select>
                </label>
                <div className="email-template-list-container">

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

                </div>
            </form>
        </>
    );
};

export default Statesave;


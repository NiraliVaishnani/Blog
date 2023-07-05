import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SettingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/setting/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setKey(data.Key);
                    setValue(data.Value);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = id ? `http://localhost:5000/api/setting/${id}` : 'http://localhost:5000/api/setting';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Key: key, Value: value }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/setting');
            } else {
                throw new Error('Error creating Setting.');
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="setting-container">
            <form onSubmit={handleSubmit}>
                <h2>{id ? 'Edit User Setting' : 'Add User Setting'}</h2>
                <label>KEY</label>
                <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
                <label>VALUE</label>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <div>
                    <button type="submit" className="add-template-button2">
                        {id ? 'Save changes' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingForm;

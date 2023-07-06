import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserSave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/userprofile/${id}`)
                // .then(response =>
                //     response.json()
                // )
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    setFirstname(data.firstname);
                    setLastname(data.lastname);
                    setGender(data.gender);
                    setEmail(data.email);

                })
                .catch(error => console.log(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = id ? `http://localhost:5000/api/userprofile/${id}` : 'http://localhost:5000/api/userprofile';

            const response = await fetch(url, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname, lastname, gender, email }),
            });

            if (response.ok) {
                console.log('User profile saved successfully.');
                navigate('/user');
            } else {
                throw new Error('Error saving user profile.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{id ? 'Edit User Profile' : 'Add User Profile'}</h2>
                <div>
                    <label>First Name</label>
                    <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div>
                    <label>Gender</label>
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">{id ? 'Save Changes' : 'Save'}</button>
            </form>
        </div>
    );
};

export default UserSave;


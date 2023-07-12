import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserSave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectRoles, setSelectedRoles] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/userprofile/${id}`)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    setSelectedRoles(data.selectRoles)
                    setFirstname(data.firstname);
                    setLastname(data.lastname);
                    setGender(data.gender);
                    setEmail(data.email);
                    setPassword(data.password);

                })
                .catch(error => console.log(error));
        }
    }, [id]);

    useEffect(() => {
        // Fetch the list of roles from the backend API
        fetch('http://localhost:5000/api/userrole')
            .then(response => response.json())
            .then(data => setRoles(data))
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = id ? `http://localhost:5000/api/userprofile/${id}` : 'http://localhost:5000/api/userprofile';

            const response = await fetch(url, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname, lastname, gender, email, password, rolename: selectRoles }),
            });

            if (response.ok) {
                console.log('User profile saved successfully.');
                navigate('/user');
            } else {
                throw new Error('Error saving user profile.');
            }
        } catch (error) {
            console.error(error)
        }
    };
    const handleRoleChange = (event) => {
        setSelectedRoles(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{id ? 'Edit User Profile' : 'Add User Profile'}</h2>
                <label class="dropdown" >
                    Role:
                    <select value={selectRoles} onChange={handleRoleChange}>
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.rolename}>{role.rolename}</option>
                        ))}
                    </select>
                </label><br></br><br></br>
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
                <div>
                    <label>Password</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="add-template-button2">{id ? 'Save Changes' : 'Submit'}</button>
            </form>
        </div>
    );
};

export default UserSave;


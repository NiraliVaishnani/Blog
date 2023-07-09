import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Rolesave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/userrole/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setRoleName(data.rolename);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = id ? `http://localhost:5000/api/userrole/${id}` : 'http://localhost:5000/api/userrole';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rolename: roleName }),
            });

            const data = await response.json();

            console.log(data);
            navigate(`/role`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="role-save-container">
            <form onSubmit={handleSubmit}>
                {id ? <h2>Edit Role</h2> : <h2>Add Role</h2>}
                <label>Role Name</label>
                <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)}></input>
                <button type="submit" className="add-template-button2">
                    {id ? 'Save Changes' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default Rolesave;

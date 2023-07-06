import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const User = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = () => {
        fetch('http://localhost:5000/api/userprofile')
            .then(response => response.json())
            .then(data => {
                setProfiles(data);
            })
            .catch(error => console.log(error));
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/userprofile/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('User profile deleted successfully.');
                fetchProfiles();
            } else {
                throw new Error('Error deleting user profile.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="user-profile-list-container">
                <Link to="/user/add">
                    <button className="add-profile-button">Add User Profile</button>
                </Link>
                <h1 className="profile-list-heading">List of User Profiles</h1>
                <table className="profile-table">
                    <thead>
                        <tr>
                            <th className="table-header">ID</th>
                            <th className="table-header">First Name</th>
                            <th className="table-header">Last Name</th>
                            <th className="table-header">Gender</th>
                            <th className="table-header">Email</th>
                            <th className="table-header">Edit</th>
                            <th className="table-header">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map(profile => (
                            <tr key={profile.id}>
                                <td>{profile.id}</td>
                                <td>{profile.firstname}</td>
                                <td>{profile.lastname}</td>
                                <td>{profile.gender}</td>
                                <td>{profile.email}</td>
                                <td>
                                    <Link to={`/user/${profile.id}/edit`}>
                                        <button className="editButton">Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="deleteButton"
                                        onClick={() => handleDelete(profile.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;

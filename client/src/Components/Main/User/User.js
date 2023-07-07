import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Userdelete from './Userdelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

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

    return (
        <div>
            <div className="email-template-list-container">
                <Link to="/user/add">
                    <button className="add-template-button">Add User Profile</button>
                </Link>
                <h1 className="template-list-heading">List of User Profiles</h1>
                <table className="template-table">
                    <thead>
                        <tr>
                            <td className="table-header">ID</td>
                            <td className="table-header">First Name</td>
                            <td className="table-header">Last Name</td>
                            <td className="table-header">Gender</td>
                            <td className="table-header">Email</td>
                            <td className="table-header">Action</td>

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

                                        <FontAwesomeIcon className="editButton" icon={faPenToSquare} />

                                    </Link>
                                    <Userdelete id={profile.id} fetchProfiles={fetchProfiles} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;

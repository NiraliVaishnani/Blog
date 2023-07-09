import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Userdelete from './Userdelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Popup from 'react-popup';

const User = () => {
    const [profiles, setProfiles] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    const handleResetPassword = () => {
        console.log('reset password');
        // Implement the logic to reset the password here
        // ...

        // Close the popup after resetting the password
        setIsPopupOpen(false);
    };

    return (
        <div>
            <div className="email-template-list-container">
                <Link to="/user/add">
                    <button className="add-template-button">Add User Profile</button>
                </Link>
                <h1 className="template-list-heading">List of User List</h1>
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
                                    <Userdelete id={profile.id} fetchProfiles={fetchProfiles} />
                                    <button className="resetButton" onClick={() => setIsPopupOpen(true)}>
                                        Reset Password
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Render the popup outside the table */}
            {isPopupOpen && (
                <Popup modal closeOnDocumentClick onClose={() => setIsPopupOpen(false)}>
                    <div>
                        <h2>Reset Password</h2>
                        {/* Add your password reset form or content here */}
                        {/* ... */}
                        <button onClick={handleResetPassword}>Confirm</button>
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default User;

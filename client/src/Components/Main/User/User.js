import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Userdelete from './Userdelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup';
import '../../../css/Popupreact.css';


const User = () => {
    const [profiles, setProfiles] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProfileEmail, setSelectedProfileEmail] = useState('');

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

    const handleResetPassword = (email) => {

        fetch('http://localhost:5000/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Password reset request sent');
                setIsPopupOpen(false)
            })
            .catch(error => console.log(error));

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
                            <td className="table-header">Password</td>
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
                                <td>{profile.password}</td>
                                <td>
                                    <Link to={`/user/${profile.id}/edit`}>
                                        <FontAwesomeIcon className="editButton" icon={faPenToSquare} />
                                    </Link>
                                    <Userdelete id={profile.id} fetchProfiles={fetchProfiles} />

                                    {/* 
                                    <button className="resetButton"  onClick={() => setIsPopupOpen(true)}>Reset Password</button> */}
                                    <button className="resetButton" onClick={() => {
                                        setSelectedProfileEmail(profile.email);
                                        setIsPopupOpen(true);
                                    }}>Reset Password</button>
                                    {/* <button className="resetButton" onClick={() => handleResetPassword(profile.email)}>Reset Password</button> */}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Render the popup */}
            <Popup open={isPopupOpen} closeOnDocumentClick onClose={() => setIsPopupOpen(false)}>
                <div className="popup-content">
                    <h2>Reset Password</h2>
                    <h5>Are you sure u want to reset password??</h5>
                    <button onClick={() => handleResetPassword(selectedProfileEmail)}>Confirm</button>
                </div>
            </Popup>
        </div>
    );
};

export default User;





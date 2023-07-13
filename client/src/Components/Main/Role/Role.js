import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Roledelete from './Roledelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const Role = () => {
    const [roles, setRoles] = useState([]);

    const { id } = useParams();

    const fetchRoles = () => {
        fetch('http://localhost:5000/api/userrole')
            .then(response => response.json())
            .then(data => {
                setRoles(data);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div>
            <div className="email-template-list-container">
                <Link to='/role/add'>
                    <button className="add-template-button">Add Role</button>
                </Link>
                <h1 className="template-list-heading">List of Roles</h1>
                <table className="template-table">
                    <thead>
                        <tr>
                            <td className="table-header">ID</td>
                            <td className="table-header">Role Name</td>

                            <td className="table-header">Action</td>

                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.rolename}</td>

                                <td>
                                    <Link to={`/role/${role.id}/edit`}>

                                        <FontAwesomeIcon className="editButton" icon={faPenToSquare} />

                                    </Link>

                                    <Roledelete id={role.id} fetchRoles={fetchRoles} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Role;

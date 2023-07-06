// import React from 'react'

// const State = () => {
//     return (
//         <div>
//             State
//         </div>
//     )
// }

// export default State

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Statedelete from './Statedelete';

const State = () => {
    const [states, setStates] = useState([]);
    const { id } = useParams();

    const fetchStates = () => {
        fetch('http://localhost:5000/api/state')
            .then((response) => response.json())
            .then((data) => {
                setStates(data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchStates();
    }, []);

    return (
        <div>
            <div className="email-template-list-container">
                <Link to="/state/add">
                    <button className="add-template-button">Add State</button>
                </Link>
                <h1 className="template-list-heading">List of States</h1>
                <table className="template-table">
                    <thead>
                        <tr>
                            <th className="table-header">Id</th>
                            <th className="table-header">Name</th>
                            <th className="table-header">Edit</th>
                            <th className="table-header">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {states.map((state) => (
                            <tr key={state.id}>
                                <td>{state.id}</td>
                                <td>{state.name}</td>
                                <td>
                                    <Link to={`/state/${state.id}/edit`}>
                                        <button className="editButton">Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <Statedelete id={state.id} fetchStates={fetchStates} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default State;

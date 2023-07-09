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
import '../../../../css/CountryStateCity.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

const State = () => {
    const [states, setStates] = useState([]);
    const { id } = useParams();
    const [selectedCountry, setselectedCounty] = useState([]);
    const [countries, setCountries] = useState([]);
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

    const handleCountryChange = (event) => {
        console.log("handleCountryChange");
    }

    return (
        <div>
            <div className="email-template-list-container">
                <Link to="/state/add">
                    <button className="add-template-button">Add State</button>
                </Link>
                {/* <label>
                    Country:
                    <select value={selectedCountry} onChange={handleCountryChange}>                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                    </select>
                </label> */}


                <h1 className="template-list-heading">List of States</h1>

                <table className="template-table">
                    <thead>
                        <tr>
                            <th className="table-header">Id</th>
                            <th className="table-header">Name</th>
                            <th className="table-header">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {states.map((state) => (
                            <tr key={state.id}>
                                <td>{state.id}</td>
                                <td>{state.name}</td>
                                <td>
                                    <Link to={`/state/${state.id}/edit`}>
                                        <FontAwesomeIcon className="editButton" icon={faPenToSquare} />
                                    </Link>

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

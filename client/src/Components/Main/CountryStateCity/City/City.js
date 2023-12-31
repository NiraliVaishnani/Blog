import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Citydelete from './Citydelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

const City = () => {
    const [cities, setCities] = useState([]);
    const { id } = useParams();

    const fetchCities = () => {
        fetch('http://localhost:5000/api/city')
            .then((response) => response.json())
            .then((data) => {
                setCities(data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchCities();
    }, []);

    return (
        <div>
            <div className="email-template-list-container">
                <Link to="/city/add">
                    <button className="add-template-button">Add City</button>
                </Link>
                <h1 className="template-list-heading">List of Cities</h1>
                <table className="template-table">
                    <thead>
                        <tr>
                            <th className="table-header">Id</th>
                            <th className="table-header">Name</th>
                            <th className="table-header">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city) => (
                            <tr key={city.id}>
                                <td>{city.id}</td>
                                <td>{city.name}</td>
                                <td>
                                    <Link to={`/city/${city.id}/edit`}>
                                        <FontAwesomeIcon className="editButton" icon={faPenToSquare} />
                                    </Link>

                                    <Citydelete id={city.id} fetchCities={fetchCities} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default City;


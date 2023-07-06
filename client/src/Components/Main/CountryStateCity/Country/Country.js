import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Countrydelete from './Countrydelete';

const Country = () => {
    const [countries, setCountries] = useState([]);
    const { id } = useParams();


    const fetchCountry = () => {
        fetch('http://localhost:5000/api/country')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchCountry();
    }, []);
    return (
        <div>

            <div className="email-template-list-container">
                <Link to='/country/add'><button className="add-template-button">AddCountry</button></Link>
                <h1 className="template-list-heading">List of Countries</h1>
                <table className="template-table">
                    <tr>

                        <td className="table-header">Id</td>
                        <td className="table-header">Name</td>
                        <td className="table-header">Edit</td>
                        <td className="table-header">Delete</td>
                    </tr>

                    {countries.map((country) => (
                        <tr key={country.id}>
                            <td>{country.id}</td>
                            <td>{country.name}</td>
                            <td><Link to={`/country/${country.id}/edit`}>
                                <button className="editButton">Edit</button></Link></td>
                            <td>  <Countrydelete id={country.id} fetchCountry={fetchCountry} />
                            </td>
                        </tr>

                    ))}

                </table>

            </div>
        </div>
    )
}

export default Country

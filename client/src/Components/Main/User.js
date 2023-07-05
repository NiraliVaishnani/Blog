// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const User = () => {
//     const [countries, setCountries] = useState([]);
//     const [countryId, setCountryId] = useState('');
//     const [states, setStates] = useState([]);
//     const [stateId, setStateId] = useState('');
//     const [cities, setCities] = useState([]);
//     const [selectedCity, setSelectedCity] = useState('');
//     const [userList, setuserList] = useState([]);

//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/address/countries');
//                 setCountries(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchCountries();
//     }, []);

//     useEffect(() => {
//         const fetchStates = async () => {
//             if (countryId) {
//                 try {
//                     const response = await axios.get(
//                         `http://localhost:5000/api/address/state/${countryId}`
//                     );
//                     setStates(response.data);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             } else {
//                 setStates([]);
//             }
//         };

//         fetchStates();
//     }, [countryId]);

//     useEffect(() => {
//         const fetchCities = async () => {
//             if (stateId) {
//                 try {
//                     const response = await axios.get(
//                         `http://localhost:5000/api/address/city/${stateId}`
//                     );
//                     setCities(response.data);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             } else {
//                 setCities([]);
//             }
//         };

//         fetchCities();
//     }, [stateId]);

//     const handleCountryChange = (event) => {
//         setCountryId(event.target.value);
//     };

//     const handleStateChange = (event) => {
//         setStateId(event.target.value);
//     };

//     const handleCityChange = (event) => {
//         setSelectedCity(event.target.value);
//     };

//     const Useraddress2 = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/address');
//             setuserList(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const Useraddress = async (e) => {
//         e.preventDefault();

//         try {

//             const response = await fetch('http://localhost:5000/api/address', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ country, state, city }),
//             });

//             const data = await response.json();
//             console.log(data);

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             <div>
//                 <label>Country:</label>
//                 <select value={countryId} onChange={handleCountryChange}>
//                     <option value="">Select Country</option>
//                     {countries.map((country) => (
//                         <option key={country.id} value={country.id}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>

//                 <label>State:</label>
//                 <select value={stateId} onChange={handleStateChange}>
//                     <option value="">Select State</option>
//                     {states.map((state) => (
//                         <option key={state.id} value={state.id}>
//                             {state.name}
//                         </option>
//                     ))}
//                 </select>

//                 <label>City:</label>
//                 <select value={selectedCity} onChange={handleCityChange}>
//                     <option value="">Select City</option>
//                     {cities.map((city) => (
//                         <option key={city.id} value={city.id}>
//                             {city.name}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={Useraddress}>Submit</button>
//             </div>
//             <table className="template-table">
//                 <tr>

//                     <td className="table-header">ID</td>
//                     <td className="table-header">Country</td>
//                     <td className="table-header">State</td>
//                     <td className="table-header">City</td>
//                 </tr>
//                 <tbody>
//                     {userList.map((userList) => (
//                         <tr key={userList.id}>
//                             <td>{userList.id}</td>
//                             <td>{userList.country.name}</td>
//                             <td>{userList.state.name}</td>
//                             <td>{userList.city.name}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// };

// export default User;

import React, { useState, useEffect } from 'react';

const User = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        // Fetch the list of countries from the backend API
        fetch('http://localhost:5000/api/address/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleCountryChange = (event) => {
        const countryId = event.target.value;
        setSelectedCountry(countryId);
        setSelectedState('');
        setSelectedCity('');

        // Fetch the corresponding states for the selected country
        fetch(`http://localhost:5000/api/address/state/${countryId}`)

            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => {
                console.error('Error fetching states:', error);
            });
    };

    const handleStateChange = (event) => {
        const stateId = event.target.value;
        setSelectedState(stateId);
        setSelectedCity('');

        // Fetch the corresponding cities for the selected state
        fetch(`http://localhost:5000/api/address/city/${stateId}`)
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => {
                console.error('Error fetching cities:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the selected country, state, and city to the backend API for storage
        fetch('http://localhost:5000/api/address/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: selectedCountry,
                state: selectedState,
                city: selectedCity,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data submitted successfully:', data);
                // Reset form fields
                setSelectedCountry('');
                setSelectedState('');
                setSelectedCity('');
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Country:
                <select value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                    {countries.map(country => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                </select>
            </label>

            <label>
                State:
                <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                    <option value="">Select State</option>
                    {states.map(state => (
                        <option key={state.id} value={state.id}>{state.name}</option>
                    ))}
                </select>
            </label>

            <label>
                City:
                <select value={selectedCity} onChange={event => setSelectedCity(event.target.value)} disabled={!selectedState}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </select>
            </label>

            <button type="submit" disabled={!selectedCity}>
                Submit
            </button>
        </form>
    );
};

export default User;


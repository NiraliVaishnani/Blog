// import React, { useState, useEffect } from 'react';

// const User = () => {
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [selectedState, setSelectedState] = useState('');
//     const [selectedCity, setSelectedCity] = useState('');
//     const [useraddress, setuseraddress] = useState([]);

//     useEffect(() => {
//         // Fetch the list of countries from the backend API
//         fetch('http://localhost:5000/api/address/countries')
//             .then(response => response.json())
//             .then(data => setCountries(data))
//             .catch(error => {
//                 console.error('Error fetching countries:', error);
//             });
//     }, []);

//     const handleCountryChange = (event) => {
//         const countryId = event.target.value;
//         setSelectedCountry(countryId);
//         setSelectedState('');
//         setSelectedCity('');

//         // Fetch the corresponding states for the selected country
//         fetch(`http://localhost:5000/api/address/state/${countryId}`)

//             .then(response => response.json())
//             .then(data => setStates(data))
//             .catch(error => {
//                 console.error('Error fetching states:', error);
//             });
//     };

//     const handleStateChange = (event) => {
//         const stateId = event.target.value;
//         setSelectedState(stateId);
//         setSelectedCity('');

//         // Fetch the corresponding cities for the selected state
//         fetch(`http://localhost:5000/api/address/city/${stateId}`)
//             .then(response => response.json())
//             .then(data => setCities(data))
//             .catch(error => {
//                 console.error('Error fetching cities:', error);
//             });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // Send the selected country, state, and city to the backend API for storage
//         fetch('http://localhost:5000/api/address/submit', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 country: selectedCountry,
//                 state: selectedState,
//                 city: selectedCity,
//             }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Data submitted successfully:', data);
//                 // Reset form fields
//                 setSelectedCountry('');
//                 setSelectedState('');
//                 setSelectedCity('');
//                 // Fetch updated user address data
//                 fetchUseraddress();
//             })
//             .catch(error => {
//                 console.error('Error submitting data:', error);
//             });
//     };

//     const fetchUseraddress = () => {
//         fetch('http://localhost:5000/api/address/submit')
//             .then(response => response.json())
//             .then(data => {
//                 setuseraddress(data);

//             })
//             .catch(error => console.log(error));


//     }
//     useEffect(() => {
//         fetchUseraddress();
//     }, []);

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Country:
//                     <select value={selectedCountry} onChange={handleCountryChange}>
//                         <option value="">Select Country</option>
//                         {countries.map(country => (
//                             <option key={country.id} value={country.id}>{country.name}</option>
//                         ))}
//                     </select>
//                 </label>

//                 <label>
//                     State:
//                     <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
//                         <option value="">Select State</option>
//                         {states.map(state => (
//                             <option key={state.id} value={state.id}>{state.name}</option>
//                         ))}
//                     </select>
//                 </label>

//                 <label>
//                     City:
//                     <select value={selectedCity} onChange={event => setSelectedCity(event.target.value)} disabled={!selectedState}>
//                         <option value="">Select City</option>
//                         {cities.map(city => (
//                             <option key={city.id} value={city.id}>{city.name}</option>
//                         ))}
//                     </select>
//                 </label>

//                 <button type="submit" disabled={!selectedCity}>
//                     Submit
//                 </button>
//             </form>
//             <table className="template-table">
//                 <tr>

//                     <td className="table-header">Id</td>
//                     <td className="table-header">Country</td>
//                     <td className="table-header">State</td>
//                     <td className="table-header">City</td>
//                 </tr>

//                 {useraddress.map((Useraddress) => (
//                     <tr key={Useraddress.id}>
//                         <td>{Useraddress.id}</td>
//                         <td>{Useraddress.country}</td>

//                         <td>{Useraddress.state}</td>
//                         <td>{Useraddress.city}</td>

//                     </tr>

//                 ))}

//             </table>

//         </>
//     );
// };

// export default User;
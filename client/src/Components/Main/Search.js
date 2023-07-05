import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../../../src/css/Home.css';
const Search = ({ setPosts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Make the API call with the search term
        fetch(`http://localhost:5000/api/blog?search=${searchTerm}`)
            .then((response) =>
                response.json())
            .then((data) => {
                console.log("API response:", data);
                setPosts(data.blogs);
                console.log("Posts updated:", data.blogs);
            })
            .catch((error) => console.log(error));
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className='searchhinput'
            />

            {/* <Link to={`/search/${searchTerm}`}>
                <button onClick={handleSearch} className='searchbutton'>Search</button> </Link> */}
            <button onClick={handleSearch} className='searchbutton'>Search</button>
        </div>
    );
};

export default Search;

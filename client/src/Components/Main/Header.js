import React, { useState } from 'react';
import '../../../src/css/Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            <div id="header">
                <div>
                    <Link to="/">
                        <img src={Logo} alt="xyz" className="logo" />
                    </Link>
                    <h6>ART</h6>
                    <h6>SCIENCE</h6>
                    <h6>TECHNOLOGY</h6>
                    <h6>CINEMA</h6>
                    {/* <div className='search' ><input type="search" placeholder='Search by Title'></input>
                        <Link to="search/:title"><button><FontAwesomeIcon icon={faSearch} /></button></Link>
                    </div> */}
                    <div className="rightmenu"></div>
                    <Link className="link" to="/account/register"><h6><b>REGISTER</b></h6></Link>
                    <Link className="link" to="/account/login"><h6><b>LOGIN</b></h6></Link>
                    <div className="dropdown">
                        <button onClick={toggleDropdown} className="link">
                            <h6>
                                <b>Admin</b>
                            </h6>
                        </button>
                        {showDropdown && (
                            <div className="dropdown-content">

                                <Link className="link" to="/addblog">
                                    <h6>
                                        <b>ADDBLOG</b>
                                    </h6>
                                </Link>
                                <Link className="link" to="/email-template">
                                    <h6>
                                        <b>EMAILTEMPLATE</b>
                                    </h6>
                                </Link>
                                <Link className="link" to="/setting">
                                    <h6>
                                        <b>SETTING</b>
                                    </h6>
                                </Link>
                                <Link className="link" to="/user">
                                    <h6>
                                        <b>USER</b>
                                    </h6>
                                </Link>


                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

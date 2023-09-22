import React, { useState, useContext, useEffect } from "react";
import "../../../src/css/Header.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo3.png";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "./TokenContext";
import userImage from "../../images/userprofile.png";
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { loggedInUser, logOut } = useContext(TokenContext);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    console.log("logged out");
    localStorage.removeItem("login-data");
    logOut();
    navigate("/logout");
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
          {/* <Link className="link" to="/account/register"><h6><b>REGISTER</b></h6></Link>
                    <Link className="link" to="/account/login"><h6><b>LOGIN</b></h6></Link>
                    <Link className="link" onClick={handleLogout}><h6><b>LOGOUT</b></h6></Link> */}
          {loggedInUser ? (
            <>
              {/* <h2> {loggedInUser.username}</h2>

              <Link className="link" onClick={handleLogout}>
                <h6>
                  <b>LOGOUT</b>
                </h6>
              </Link> */}

              <div className="user-menu">
                <img src={userImage} alt="User" className="user-avatar" />
                <h4>{loggedInUser.username}</h4>
                <Link className="link" onClick={handleLogout}>
                  <h6>
                    <b>LOGOUT</b>
                  </h6>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link className="link" to="/account/register">
                <h6>
                  <b>REGISTER</b>
                </h6>
              </Link>
              <Link className="link" to="/account/login">
                <h6>
                  <b>LOGIN</b>
                </h6>
              </Link>
            </>
          )}
          {/* {loggedInUser ? (
                        <h6>
                            <b>{loggedInUser.username}</b>
                        </h6>
                    ) : (
                        <>
                            <Link className="link" to="/account/register">
                                <h6>
                                    <b>REGISTER</b>
                                </h6>
                            </Link>
                            <Link className="link" to="/account/login">
                                <h6>
                                    <b>LOGIN</b>
                                </h6>
                            </Link>
                        </>
                    )} */}
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
                <Link className="link" to="/role">
                  <h6>
                    <b>ROLE</b>
                  </h6>
                </Link>
                <Link className="link" to="/country">
                  <h6>
                    <b>COUNTRY</b>
                  </h6>
                </Link>
                <Link className="link" to="/state">
                  <h6>
                    <b>STATE</b>
                  </h6>
                </Link>
                <Link className="link" to="/city">
                  <h6>
                    <b>CITY</b>
                  </h6>
                </Link>

                <Link className="link" to="/chat/signin">
                  <h6>
                    <b>CHAT</b>
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

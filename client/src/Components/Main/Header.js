import React from 'react'
import '../../../src/css/Header.css'
import { Link } from 'react-router-dom'
import Logo from "../../images/logo3.png";

const Header = () => {
    return (
        <div>
            <div id="header">
                <div >
                    <Link to="/">
                        <img src={Logo} alt="xyz" className="logo" />
                    </Link>
                    <h6>ART</h6>
                    <h6>SCIENCE</h6>
                    <h6>TECHNOLOGY</h6>
                    <h6>CINEMA</h6>
                    <Link className="link" to="/account/register"><h6><b>REGISTER</b></h6></Link>
                    <Link className="link" to="/account/login"><h6><b>LOGIN</b></h6></Link>
                    <Link className="link" to='/addblog'><h6><b>ADDBLOG</b></h6></Link>
                    <Link className="link" to='/email-template'><h6><b>EMAILTEMPLATE</b></h6></Link>
                    <Link className="link" to='/setting'><h6><b>SETTING</b></h6></Link>
                </div>
            </div>
        </div>
    )
}
export default Header
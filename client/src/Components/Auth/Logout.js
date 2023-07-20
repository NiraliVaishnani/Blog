import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../Main/TokenContext';


const Logout = () => {
    const { logOut } = useContext(TokenContext)
    const navigate = useNavigate();
    useEffect(() => {
        logOut();
        navigate('/');
    });
    return (
        <div>

        </div>
    )
}

export default Logout

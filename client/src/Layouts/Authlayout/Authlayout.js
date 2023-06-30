import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Main/Footer';

function AuthLayout() {
    return (
        <div >
            <Outlet />
            <Footer style={{ marginTop: 'auto' }} />

        </div>
    );
}
export default AuthLayout;



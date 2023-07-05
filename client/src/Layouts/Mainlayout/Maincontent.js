import React from 'react';
import Header from '../../Components/Main/Header';

import Footer from '../../Components/Main/Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Main/Sidebar';
import Rightsidebar from '../../Components/Main/Rightsidebar';

const MainContent = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: 1 }} className="content-container">
                <Sidebar />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainContent;

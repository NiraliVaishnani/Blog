import React, { useState } from 'react';
import '../../css/Sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const menuItem = [
        {
            path: "/art",
            name: "Art"
        },
        {
            path: "/science",
            name: "Science"
        },
        {
            path: "/technology",
            name: "Technology"
        },
        {
            path: "/cinema",
            name: "Cinema"
        },
    ];

    return (
        <>
            <div className="abc"  >
                <div className="ryt">
                    <div className="xyz" >
                        {openSidebar === false ? (
                            <FontAwesomeIcon icon={faBars} onClick={handleOpenSidebar} />
                        ) : (
                            <FontAwesomeIcon icon={faTimes} onClick={handleOpenSidebar} />
                        )}
                    </div>

                    <div className={`sidebar2 ${openSidebar ? 'open' : ''}`}>
                        {menuItem.map((item, index) => (
                            <Link className="link" to={item.path} key={index}>
                                <div>{item.name}</div>
                            </Link>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

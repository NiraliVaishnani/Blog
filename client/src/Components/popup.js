import React from 'react';
import '../css/popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Popup = ({ title, children, open, onClose }) => {
    if (!open) {
        return null; // Don't render anything if the popup is closed
    }

    return (
        <div className="popup">
            <div className="popup-overlay" onClick={onClose}></div>
            <div className="popup-content">
                <h2 className="popup-title">{title}</h2>
                <div className="popup-body">{children}</div>
                <button className="popup-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
};


export default Popup;

import React, { useState } from 'react';

const PopupButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Open Popup</button>
            {isOpen && (
                <div className="popup">
                    <h1>Popup Content</h1>
                    <p>This is a popup window.</p>
                    <button onClick={handleButtonClick}>Close</button>
                </div>
            )}
        </div>
    );
};

export default PopupButton;

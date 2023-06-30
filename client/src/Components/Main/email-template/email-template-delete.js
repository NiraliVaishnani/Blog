import React, { useState } from 'react';
import Popup from '../../popup';
import '../../../css/emailTemplate.css';


const EmailTemplateDelete = (props) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/emailtemplate/${props.id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
            props.fetchEmailTemplate();
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <td><button className="deleteButton" onClick={handleOpenPopup}>
                Delete
            </button></td>

            {isPopupOpen && (
                <Popup title="Confirmation" open={isPopupOpen} onClose={handleClosePopup}>
                    <p>Are you sure you want to delete this item?</p>
                    <button className="fianally" onClick={handleDelete}>Confirm Delete</button>
                </Popup>
            )}
        </>
    );
};

export default EmailTemplateDelete;


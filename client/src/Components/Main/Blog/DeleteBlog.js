import React, { useState } from 'react'
import Popup from '../../popup';
import '../../../css/Blog/Addblog.css';

import { useParams, useNavigate } from 'react-router-dom';
const DeleteBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleDelete = async () => {
        fetch(`http://localhost:5000/api/blog/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate(`/`)
            })
            .catch(error => console.log(error));
    }

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    return (
        <div>
            {/* <button onClick={handleDelete}>Delete</button> */}


            <td><button className="deleteButton" onClick={handleOpenPopup}>
                Delete
            </button></td>

            {isPopupOpen && (
                <Popup title="Confirmation" open={isPopupOpen} onClose={handleClosePopup}>
                    <p>Are you sure you want to delete this item?</p>
                    <button className="fianally" onClick={handleDelete}>Confirm Delete</button>
                </Popup>
            )}
        </div>
    )
}

export default DeleteBlog

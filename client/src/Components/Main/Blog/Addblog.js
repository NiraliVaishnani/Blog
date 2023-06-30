import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../css/Blog/Addblog.css';
import '../../../css/Blog/EditBlog.css';
import Popup from '../../popup';

const BlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // Store the selected file
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/blog/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setTitle(data.title);
                    setDescription(data.description);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleBlog = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image);

            const url = id ? `http://localhost:5000/api/blog/${id}` : 'http://localhost:5000/api/blog';
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data);
            navigate(id ? `/blog/${id}` : '/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleFile = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        console.log("hyy");
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isPopupOpen) {
            handleOpenPopup();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={id ? 'editblog' : 'addblog'}>
                    <h1>{id ? 'Edit Blog' : 'Add Blog'}</h1>
                    <h3>Title</h3>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <h3>Description</h3>
                    <textarea value={description} className="textarea" onChange={(e) => setDescription(e.target.value)}></textarea>
                    <h3>Image uploading</h3>
                    <input type="file" name="file" onChange={handleFile}></input>
                    <button type="submit">{id ? 'Save Changes' : 'Add Blog'}</button>
                </div>
            </form>

            {isPopupOpen && (
                <Popup title="Confirmation" open={isPopupOpen} onClose={handleClosePopup}>
                    <p>{id ? 'Are you sure you want to edit?' : 'Are you sure you want to add?'}</p>
                    <button type="submit" onClick={handleBlog}>{id ? 'Confirm Changes' : 'Confirm Add'}</button>
                </Popup>
            )}
        </div>
    );
};

export default BlogForm;





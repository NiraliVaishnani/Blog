import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmailTemplateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/emailtemplate/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setSubject(data.subject);
                    setBody(data.body);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleEmailTemplate = async (e) => {
        e.preventDefault();

        try {
            const url = id ? `http://localhost:5000/api/emailtemplate/${id}` : 'http://localhost:5000/api/emailtemplate';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject, body }),
            });

            const data = await response.json();
            console.log(data);
            navigate(`/email-template`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="email-template-list-container">
            <form onSubmit={handleEmailTemplate}>
                {id ? <h2>Edit Email Template</h2> : <h2>Add Email Template</h2>}
                <label>Subject</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}></input>
                <label>Description</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button type="submit" className="add-template-button2">
                    {id ? 'Save Changes' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default EmailTemplateForm;

import React, { useState, useEffect } from 'react'
import '../../../css/emailTemplate.css';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Emailtemplatedelete from './email-template-delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
const Emailtemplatelist = () => {
    const { id } = useParams();

    const [emailtemplate, setEmailTemplate] = useState([]);
    const fetchEmailTemplate = () => {
        fetch('http://localhost:5000/api/emailtemplate')
            .then(response => response.json())
            .then(data => {
                setEmailTemplate(data);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchEmailTemplate();
    }, []);
    return (
        <div className="email-template-list-container">
            <Link to='/email-template/add'><button className="add-template-button">AddEmailTemplate</button></Link>
            <h1 className="template-list-heading">List of EmailTemplate</h1>
            <table className="template-table">
                <tr>

                    <td className="table-header">Subject</td>
                    <td className="table-header">Body</td>
                    <td className="table-header">Action</td>

                </tr>

                {emailtemplate.map((emailtemplates) => (
                    <tr key={emailtemplates.id}>

                        <td>{emailtemplates.subject}</td>
                        <td>{emailtemplates.body}</td>
                        <td><Link to={`/email-template/${emailtemplates.id}/edit`}>
                            <FontAwesomeIcon className="editButton" icon={faPenToSquare} /></Link>
                            <Emailtemplatedelete id={emailtemplates.id} fetchEmailTemplate={fetchEmailTemplate} /></td>
                    </tr>

                ))}

            </table>

        </div>
    )
}

export default Emailtemplatelist





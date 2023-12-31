import React, { useState, useEffect, useContext } from 'react'
import '../../../css/Setting.css';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Settingdelete from './setting-delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TokenContext } from '../TokenContext';
const Settinglist = () => {
    const { id } = useParams();
    const { role } = useContext(TokenContext)
    // Role-based authorization using `includes` method

    const authorizedRoles = [role]
    const isAuthorized = authorizedRoles.includes(1);
    console.log(`Authorization`, authorizedRoles.includes(1))

    const [setting, setSetting] = useState([]);
    const fetchSetting = () => {
        fetch('http://localhost:5000/api/setting')
            .then(response => response.json())
            .then(data => {
                setSetting(data);
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        fetchSetting();
    }, []);
    return (
        <div className="setting-container">
            <Link to='/setting/add'><button className="add-template-button">AddSetting</button></Link>
            <h1 className="setting-heading">List of User Setting</h1>
            <table className="setting-table">
                <tr>
                    <td className="table-header">Key</td>
                    <td className="table-header">Value</td>
                    {/* {isAuthorized ? (<><td className="table-header">Action</td></>
                    )} */}
                    {isAuthorized && (<><td className="table-header">Action</td></>)}
                </tr>
                <tbody>

                    {setting.map((settings) => (
                        <tr key={settings.id}>
                            <td>{settings.Key}</td>
                            <td>{settings.Value}</td>
                            {isAuthorized && (<td><Link to={`/setting/${settings.id}/edit`}>
                                <FontAwesomeIcon className="editButton" icon={faPenToSquare} /></Link>
                                <Settingdelete id={settings.id} fetchSetting={fetchSetting} /></td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Settinglist
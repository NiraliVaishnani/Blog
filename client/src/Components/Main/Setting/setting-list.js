import React, { useState, useEffect } from 'react'
import '../../../css/Setting.css';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Settingdelete from './setting-delete';
const Settinglist = () => {
    const { id } = useParams();

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
                    <td className="table-header">Edit</td>
                    <td className="table-header">Delete</td>
                </tr>
                <tbody>

                    {setting.map((settings) => (
                        <tr key={settings.id}>
                            <td>{settings.Key}</td>
                            <td>{settings.Value}</td>
                            <td><Link to={`/setting/${settings.id}/edit`}>
                                <button className="editButton">Edit</button></Link></td>
                            <td><Settingdelete id={settings.id} fetchSetting={fetchSetting} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Settinglist
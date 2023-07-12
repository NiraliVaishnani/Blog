// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const Rolesave = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [roleName, setRoleName] = useState('');
//     const [checked, setChecked] = useState(false);
//     const [allchecked, setAllChecked] = useState([]);
//     useEffect(() => {
//         if (id) {
//             fetch(`http://localhost:5000/api/userrole/${id}`)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     setRoleName(data.rolename);

//                 })
//                 .catch((error) => console.log(error));
//         }
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const url = id ? `http://localhost:5000/api/userrole/${id}` : 'http://localhost:5000/api/userrole';
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ rolename: roleName }),
//             });

//             const data = await response.json();

//             console.log(data);
//             navigate(`/role`);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     // function handleChange(e) {
//     //     setChecked(e.target.checked);
//     // }
//     function handleChange(e) {
//         if (e.target.checked) {
//             setAllChecked([...allchecked, e.target.value]);
//             console.log(setAllChecked(e.target.value));
//         } else {
//             setAllChecked(allchecked.filter((item) => item !== e.target.value));
//         }
//     }

//     return (
//         <div className="role-save-container">
//             <form onSubmit={handleSubmit}>
//                 {id ? <h2>Edit Role</h2> : <h2>Add Role</h2>}
//                 <label>Role Name</label>
//                 <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)}></input>
//                 <label>Permission</label>
//                 <input type="checkbox" value="Blog_add" onChange={handleChange}></input><label>Blog_add</label>
//                 <input type="checkbox" value="Blog_delete" onChange={handleChange}></input><label>Blog_delete</label>
//                 <input type="checkbox" value="Blog_list" onChange={handleChange}></input><label>Blog_list</label>
//                 <input type="checkbox" value="User_list" onChange={handleChange}></input><label>User_list</label>
//                 <button type="submit" className="add-template-button2">


//                     {id ? 'Save Changes' : 'Submit'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Rolesave;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Rolesave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState('');
    const [permissionName, setPermissionName] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/userrole/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setRoleName(data.rolename);
                    setPermissionName(data.permissionName);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = id ? `http://localhost:5000/api/userrole/${id}` : 'http://localhost:5000/api/userrole';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rolename: roleName, permissionName }),
            });

            const data = await response.json();

            console.log(data);
            navigate(`/role`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="role-save-container">
            <form onSubmit={handleSubmit}>
                {id ? <h2>Edit Role</h2> : <h2>Add Role</h2>}
                <label>Role Name</label>
                <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)}></input>
                <label>Permission Name</label>

                <input
                    type="checkbox"
                    checked={permissionName === 'BlogAdd'}
                    onChange={(e) => setPermissionName(e.target.checked ? 'BlogAdd' : '')}
                />
                <label>Blog Add</label>
                <input
                    type="checkbox"
                    checked={permissionName === 'BlogEdit'}
                    onChange={(e) => setPermissionName(e.target.checked ? 'BlogEdit' : '')}
                />
                <label>Blog Edit</label>
                <input
                    type="checkbox"
                    checked={permissionName === 'BlogDelete'}
                    onChange={(e) => setPermissionName(e.target.checked ? 'BlogDelete' : '')}
                />
                <label>Blog Delete</label>
                <input
                    type="checkbox"
                    checked={permissionName === 'Userlist'}
                    onChange={(e) => setPermissionName(e.target.checked ? 'Userlist' : '')}
                />
                <label>User list</label>

                <button type="submit" className="add-template-button2">
                    {id ? 'Save Changes' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Rolesave;

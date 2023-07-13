import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../css/role.css";

const Rolesave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/userrole/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setRoleName(data.rolename);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/userpermission/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    // Extract the permission names from the data and set them in the state
                    const permissionNames = data.map((permission) => permission.PermissionName);
                    setPermissions(permissionNames);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const handleCheckboxChange = (permission, checked) => {
        if (checked) {
            // Add the permission to the array if it doesn't already exist
            setPermissions((prevPermissions) => [...prevPermissions, permission]);
        } else {
            // Remove the permission from the array if it exists
            setPermissions((prevPermissions) =>
                prevPermissions.filter((p) => p !== permission)
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const roleUrl = id
                ? `http://localhost:5000/api/userrole/${id}`
                : "http://localhost:5000/api/userrole";
            const permissionUrl = id ?
                `http://localhost:5000/api/userpermission/${id}` :
                'http://localhost:5000/api/userpermission';
            const roleMethod = id ? "POST" : "POST";
            const permissionMethod = "POST";


            const roleResponse = await fetch(roleUrl, {
                method: roleMethod,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rolename: roleName }),
            });

            const roleData = await roleResponse.json();


            const permissionResponse = await fetch(permissionUrl, {
                method: permissionMethod,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    permissions: permissions,
                    RoleId: roleData.id,
                }),
            });

            const permissionData = await permissionResponse.json();
            console.log("Permission Data:", permissionData);

            console.log("Nirali:", roleData);
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
                <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                />

                <label>Permissions</label>

                <input
                    type="checkbox"
                    className="permissions"
                    checked={permissions.includes("Blog_add")}
                    onChange={(e) =>
                        handleCheckboxChange("Blog_add", e.target.checked)
                    }
                />
                Blog_add

                <input
                    type="checkbox"
                    className="permissions"
                    checked={permissions.includes("Blog_edit")}
                    onChange={(e) =>
                        handleCheckboxChange("Blog_edit", e.target.checked)
                    }
                />
                Blog_edit

                <input
                    type="checkbox"
                    className="permissions"
                    checked={permissions.includes("Emailtemplte_add")}
                    onChange={(e) =>
                        handleCheckboxChange("Emailtemplte_add", e.target.checked)
                    }
                />
                Emailtemplte_add

                <input
                    type="checkbox"
                    className="permissions"
                    checked={permissions.includes("Emailtemplate_edit")}
                    onChange={(e) =>
                        handleCheckboxChange("Emailtemplate_edit", e.target.checked)
                    }
                />
                Emailtemplate_edit

                <input
                    type="checkbox"
                    className="permissions"
                    checked={permissions.includes("Country_add_edit")}
                    onChange={(e) =>
                        handleCheckboxChange("Country_add_edit", e.target.checked)
                    }
                />
                Country_add_edit

                <input
                    type="checkbox"
                    className="permissions"
                    checked={permissions.includes("State_add_edit")}
                    onChange={(e) =>
                        handleCheckboxChange("State_add_edit", e.target.checked)
                    }
                />
                State_add_edit


                <div>
                    {" "}
                    <button type="submit" className="add-template-button2">
                        {id ? "Save Changes" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Rolesave;

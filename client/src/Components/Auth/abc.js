import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Rolesave = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [permissionNames, setPermissionNames] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/userrole/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRoleName(data.rolename);
          setPermissionNames(data.permissionNames);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (id) {
  //       try {
  //         const response = await fetch(`http://localhost:5000/api/userrole/${id}`);
  //         const data = await response.json();
  //         setRoleName(data.rolename);
  //         setPermissionNames(data.permissionNames);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = id
        ? `http://localhost:5000/api/userrole/${id}`
        : "http://localhost:5000/api/userrole";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rolename: roleName, permissionNames }),
      });

      const data = await response.json();

      console.log(data);
      navigate(`/role`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (permission, checked) => {
    if (checked) {
      // Add the permission to the array if it doesn't already exist
      setPermissionNames((prevPermissions) => [...prevPermissions, permission]);
    } else {
      // Remove the permission from the array if it exists
      setPermissionNames((prevPermissions) =>
        prevPermissions.filter((p) => p !== permission)
      );
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
        ></input>
        <label>Permission Names</label>

        <input
          type="checkbox"
          checked={permissionNames.includes("BlogAdd")}
          onChange={(e) => handleCheckboxChange("BlogAdd", e.target.checked)}
        />
        <label>Blog Add</label>

        <input
          type="checkbox"
          checked={permissionNames.includes("BlogEdit")}
          onChange={(e) => handleCheckboxChange("BlogEdit", e.target.checked)}
        />
        <label>Blog Edit</label>

        <input
          type="checkbox"
          checked={permissionNames.includes("BlogDelete")}
          onChange={(e) => handleCheckboxChange("BlogDelete", e.target.checked)}
        />
        <label>Blog Delete</label>

        <input
          type="checkbox"
          checked={permissionNames.includes("Userlist")}
          onChange={(e) => handleCheckboxChange("Userlist", e.target.checked)}
        />
        <label>User list</label>

        <button type="submit" className="add-template-button2">
          {id ? "Save Changes" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Rolesave;



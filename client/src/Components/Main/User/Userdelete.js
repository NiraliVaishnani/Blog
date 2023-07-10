import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Userdelete = (props) => {
  const handleDelete = async () => {
    console.log("delete");
    fetch(`http://localhost:5000/api/userprofile/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));

    props.fetchProfiles();
  };
  return (
    <FontAwesomeIcon
      onClick={handleDelete}
      className="deleteButton"
      icon={faTrash}
    />
  );
};

export default Userdelete;

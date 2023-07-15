import React, { useState } from "react";
import "../../css/Auth/Register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    if (password === confirmPassword) {
      alert("Registration successful");
    } else {
      alert("Passwords do not match");
    }
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      // Reset the form
      setUsername("");
      setemail("");
      setPassword("");
      setConfirmPassword("");
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetPassword = (email) => {
    fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("Password reset request sent");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login">
      <div className="center_login">
        <h2 id="todo">REGISTER</h2>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <Link to="/">
          <h5>Back to home</h5>
        </Link>
        <Link>
          <h5 onClick={() => handleResetPassword(email)}>Forgot Password</h5>
        </Link>
      </div>
    </div>
  );
}

export default Register;

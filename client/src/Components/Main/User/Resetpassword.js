
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { resetToken } = useParams();

    const handleResetPassword = async (event) => {
        if (password === confirmPassword) {
            alert('Reset password successful');
        } else {
            alert('Passwords do not match');
        }
        event.preventDefault();

        try {
            const url = `http://localhost:5000/userprofile/reset-password/${resetToken}`; // Use the resetToken from the URL

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                // Password reset successful
                console.log("Password reset successful");
                navigate('/user');

            } else {
                // Password reset failed
                console.error("Password reset failed");
            }
        } catch (error) {
            // Handle error
            console.error("Error resetting password:", error);
        }
    };

    useEffect(() => {
        // You can perform additional actions or validations related to the resetToken here if needed
        console.log("Reset Token:", resetToken);
    }, [resetToken]);

    return (
        <div>
            <h1>Password Reset Page</h1>
            <form onSubmit={handleResetPassword}>
                <label htmlFor="password">New Password:</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <label>Confirm Password:</label>
                <input
                    type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className="add-template-button2">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;

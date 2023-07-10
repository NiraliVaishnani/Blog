// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ResetPassword = () => {
//     const { id } = useParams
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         fetch('http://localhost:5000/api/user/reset-password', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ password: password }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Handle the response from the server
//                 console.log('Password changed successfully');
//             })
//             .catch(error => console.log(error));
//     };

//     return (
//         <>
//             <div>
//                 <label>Password</label>
//                 <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <button type="submit" onClick={handleSubmit} className="add-template-button2">Submit</button>
//         </>
//     );
// };

// export default ResetPassword;

// import React, { useState } from "react";

// const ResetPassword = ({ resetToken }) => {
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Make an API call to reset the password
//       const response = await fetch("/userprofile/reset-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ resetToken, password }),
//       });

//       if (response.ok) {
//         // Password reset successful
//         console.log("Password reset successful");

//         // Reset the form
//         setPassword("");
//       } else {
//         // Handle non-successful response
//         console.error("Password reset failed");
//       }
//     } catch (error) {
//       // Handle error
//       console.error("Error resetting password:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="hidden" name="resetToken" value={resetToken} />
//       <label htmlFor="password">New Password:</label>
//       <input
//         type="password"
//         name="password"
//         id="password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//       />
//       <button type="submit">Reset Password</button>
//     </form>
//   );
// };

// export default ResetPassword;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { resetToken } = useParams();

  const handleResetPassword = async (event) => {
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
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;

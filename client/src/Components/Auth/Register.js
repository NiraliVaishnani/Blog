// import React, { useState } from 'react'
// import '../../css/Auth/Register.css'

// function Register() {
//     const [username, setUsername] = useState('');
//     const [email, setemail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const handleRegister = async (e) => {

//         if (password === confirmPassword) {
//             alert('Registration successful');
//         } else {
//             alert('Passwords do not match');
//         }
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/api/account/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, email, password }),
//             });
//             const data = await response.json();
//             console.log(data);
//             // Reset the form
//             setUsername('');
//             setemail('');
//             setPassword('');
//             setConfirmPassword('');
//         } catch (err) { console.log(err); }
//     };
//     return (
//         <div className="login" >
//             <div className="center_login">
//                 <h2 id="todo">REGISTER</h2>
//                 <label>Username:</label>
//                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                 <label>Email:</label>
//                 <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
//                 <label >Password:</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <label >Confirm Password:</label>
//                 <input type="password" value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)} />
//                 <button onClick={handleRegister}>Register </button>
//             </div>
//         </div>

//     )
// }

// export default Register

import React, { useState } from 'react';
import '../../css/Auth/Register.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        if (password === confirmPassword) {
            alert('Registration successful');
        } else {
            alert('Passwords do not match');
        }
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            console.log(data);
            // Reset the form
            setUsername('');
            setemail('');
            setPassword('');
            setConfirmPassword('');
            navigate(`/`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="login">
            <div className="center_login">
                <h2 id="todo">REGISTER</h2>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
                <Link to='/'><h5>Back to home</h5></Link>
            </div>
        </div>
    );
}

export default Register;

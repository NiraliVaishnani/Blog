import React, { useState } from 'react'
import Cookies from 'js-cookie';
import '../../css/Auth/Login.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {

            const response = await fetch('http://localhost:5000/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });


            if (response.ok) {
                const data = await response.json();
                const { token } = data;
                console.log("Token:", token);
                Cookies.set('token', token);
                alert('Login successful')
                setemail('');
                setPassword('');
                navigate(`/`);


            } else {
                console.log('Login failed');
                alert('Login failed')

            }

        } catch (err) {
            console.log(err);
        }

    };
    return (
        <>
            <div className="login" >
                <div className="center_login">
                    <h2 id="todo">LOGIN</h2>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
                    <label >Password:</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    <Link to='/'><h5>Back to home</h5></Link>
                </div>
            </div>
        </>
    )
}

export default Login





// // import React, { useState, useEffect } from 'react';

// // const ResetPassword = () => {
// //     const [password, setPassword] = useState('');

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         fetch('http://localhost:5000/api/user/reset-password', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({ email: email, password: password }),
// //         })
// //             .then(response => response.json())
// //             .then(data => {
// //                 // Handle the response from the server
// //                 console.log('Password changed successfully');
// //             })
// //             .catch(error => console.log(error));

// //     };
// //     return (
// //         <>
// //             <div>
// //                 <label>Password</label>
// //                 <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
// //             </div>
// //             <button type="submit" onClick={handleSubmit} className="add-template-button2">Submit</button>
// //         </>
// //     );
// // };

// // export default ResetPassword;

// import React, { useState } from 'react';

// const ResetPassword = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         fetch('http://localhost:5000/api/user/reset-password', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email: email, password: password }),
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
//                 <label>Email</label>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div>
//                 <label>Password</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <button type="submit" onClick={handleSubmit} className="add-template-button2">Submit</button>
//         </>
//     );
// };

// export default ResetPassword;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { id } = useParams
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/user/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Password changed successfully');
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <div>
                <label>Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" onClick={handleSubmit} className="add-template-button2">Submit</button>
        </>
    );
};

export default ResetPassword;


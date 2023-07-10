// import React from 'react'

// const Resetpassword = () => {
//     return (
//         <div>
//             Resetpassword
//         </div>
//     )
// }

// export default Resetpassword

import React, { useState, useEffect } from 'react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');


    return (
        <>
            <div>
                <label>Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="add-template-button2">Submit</button>
        </>
    );
};

export default ResetPassword;


// import React, { useState } from 'react'
// import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

// const File = () => {
//     const [imageUpload, setImageUpload] = useState()
//     const [imageUrl, setImageUrl] = useState(null);
//     const storage = getStorage()
//     const uploadFile = () => {
//         console.log('Uploading')
//         if (!imageUpload) return;
//         const imageRef = ref(storage, `images/${imageUpload.name}`)
//         uploadBytes(imageRef, imageUpload).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 console.log("Url", url);
//                 setImageUrl(url);
//             })
//         })
//     }
//     // const downloadFile = () => {
//     //     // You can trigger the download by creating an anchor element with the download URL.
//     //     const a = document.createElement('a');
//     //     a.href = imageUrl;
//     //     a.download = 'downloaded_image.jpg'; // Set the desired file name
//     //     document.body.appendChild(a);
//     //     a.click();
//     //     document.body.removeChild(a);
//     // };

//     const downloadFile = () => {
//         // You can trigger the download by creating an anchor element with the download URL.
//         const a = document.createElement('a');
//         a.href = imageUrl;
//         a.download = imageUpload.name; // Set the desired file name
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//     };

//     return (
//         <div>
//             <input type="file" onChange={(e) => { setImageUpload(e.target.files[0]) }}></input>
//             <button onClick={uploadFile}> Upload File</button>
//             {imageUrl && (
//                 <div>
//                     <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
//                     <button onClick={downloadFile}>Download</button>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default File


import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { FcDocument } from 'react-feather-icons';
import { GrDocumentText } from 'react-icons/gr';

const File = () => {
    const [fileUpload, setFileUpload] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const storage = getStorage();

    const handleFileChange = (e) => {
        setFileUpload(e.target.files[0]);
        console.log("fileUpload: ", e.target.files[0]);
    };

    const uploadFile = () => {
        if (!fileUpload) return;

        const fileRef = ref(storage, `files/${fileUpload.name}`);

        uploadBytes(fileRef, fileUpload)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                console.log('File URL', url);
                setFileUrl(url);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };

    const downloadFile = () => {
        if (fileUrl) {
            // Trigger the download using an anchor element styled as a document link
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = fileUpload.name; // Set the desired file name
            a.style.textDecoration = 'none'; // Remove underline
            a.style.color = 'inherit'; // Inherit the parent text color
            a.style.display = 'flex'; // Make it look like a document link
            a.style.alignItems = 'center'; // Center the icon and text
            a.style.marginRight = '8px'; // Add some spacing
            a.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M15 2v7h5v13H4V2h11zm2 17V9h4v10h-4z"/>
        </svg>
        ${fileUpload.name}
      `;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange}></input>
            <button onClick={uploadFile}>Upload File</button>
            {fileUrl && (
                <div onClick={downloadFile} style={{
                    backgroundColor: '#ADD8E6', width: "500px", height: "50px"// Set the background color to green (#00FF00)
                }}>
                    <span ><GrDocumentText size={30} /></span>
                    <span style={{ fontSize: "26px" }}>{fileUpload.name}</span>
                </div>
            )}
        </div>
    );
};

export default File;


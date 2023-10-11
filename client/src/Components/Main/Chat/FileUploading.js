import React, { useState } from 'react'
import { getStorage } from 'firebase/storage'
import { FaFileUpload } from 'react-icons/fa'
const FileUploading = (props) => {
    const { onFileSelect } = props;
    const [selectedFile, setSelectedFile] = useState(null);

    const imageDb = getStorage()
    const handleClick = () => {
        console.log("Uploading")
    }
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        onFileSelect(file); // Pass the selected file to the parent component

    };
    return (
        <div>
            {/* <input type='file' onChange={(e) => setImg(e.target.files[0])}></input>
            < FaFileUpload type='file' onChange={(e) => setImg(e.target.files[0])} /> */}
            <label className="file-upload-button">
                <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                />
                <FaFileUpload /> Upload File
            </label>
        </div>
    )
}

export default FileUploading

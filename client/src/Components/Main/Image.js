import React from 'react'
const Image = () => {
    return (
        <div>
            <div>
                <div >
                    <img
                        style={{ height: "500px", width: "500px" }}
                        src='../images/panda.jpg'
                        alt="image"
                        loading="lazy"
                    />
                </div>
            </div>
            <div >
                <img
                    style={{ height: "500px", width: "500px" }}
                    src="../images/lion.jpg"
                    alt="image"
                    loading="lazy"
                />
            </div>
            <div >
                <img
                    style={{ height: "500px", width: "500px" }}
                    src="../images/cat.jpg"
                    alt="image"
                    loading="lazy"
                />
            </div>

            <div>
                <div >
                    <img
                        style={{ height: "500px", width: "500px" }}
                        src='../images/butterfly.jpg'
                        alt="image"
                        loading="lazy"
                    />
                </div>
            </div>
            <div>
                <img
                    style={{ height: "500px", width: "500px" }}
                    src="../images/penguin.jpg"
                    alt="image"
                    loading="lazy"
                />
            </div>
            <div >
                <img
                    style={{ height: "500px", width: "500px" }}
                    src="../images/cat.jpg"
                    alt="image"
                    loading="lazy"
                />
            </div>

        </div >
    )
}

export default Image

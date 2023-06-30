import React, { useState, useEffect } from 'react'
import '../../../css/Blog/SingleBlog.css'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import DeleteBlog from './DeleteBlog';


const SingleBlog = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        const fetchData = () => {

            fetch(`http://localhost:5000/api/blog/${id}`)
                .then(response => response.json())
                .then(data => {
                    setPost(data);
                })
                .catch(error => console.log(error));
        }
        fetchData();
    }, [id]);
    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="singleblog">
            <img id="image2" src={`http://localhost:5000/upload/` + post.image} alt="image" />
            <h2>{post.title}</h2>
            <h4>{post.createdAt}</h4>
            <h6>{post.description}</h6>
            <Link to={`/blog/${id}/edit`}><button>Edit</button></Link>
            <DeleteBlog />
        </div>
    )
}

export default SingleBlog



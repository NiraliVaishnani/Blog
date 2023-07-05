import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../src/css/Home.css';
import Search from './Search';
import Pagination from './Pagination';
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchBlog = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/blog?page=${page}`);
            const { blogs } = response.data;
            setPosts(blogs);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlog(currentPage);
    }, [currentPage]);

    const handlePageChange = (selectedPage) => {
        const selected = selectedPage.selected + 1;
        setCurrentPage(selected);
    };

    return (
        <div className="home">
            <Search setPosts={setPosts} />
            <div className="posts">
                {posts &&
                    posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img
                                    className="image"
                                    src={`http://localhost:5000/upload/${post.image}`}
                                    alt="image"
                                />
                            </div>
                            <div className="content">
                                <h1>{post.title}</h1>
                                <h4>{post.createdAt}</h4>
                                <h6>{post.description}</h6>
                                <Link to={`/blog/${post.id}`}>
                                    <button>Read more</button>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="pagination">
                <Pagination
                    pageCount={10}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Home;

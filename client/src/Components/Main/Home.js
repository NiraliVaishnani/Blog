import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../../../src/css/Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchBlog = (page) => {
        fetch(`http://localhost:5000/api/blog?page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.blogs);
            })
            .catch((error) => console.log(error));
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
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img className="image" src={`http://localhost:5000/upload/` + post.image} alt="image" />
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
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={10}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination-container'}
                    pageClassName={'pagination-page'}
                    activeClassName={'pagination-active'}
                    previousClassName={'pagination-previous'}
                    nextClassName={'pagination-next'}
                    breakClassName={'pagination-break'}
                    disabledClassName={'pagination-disabled'}
                    initialPage={currentPage - 1}
                    key={currentPage}
                />
            </div>
        </div>
    );
};

export default Home;

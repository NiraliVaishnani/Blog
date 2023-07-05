// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../../../src/css/Home.css';
// import Search from './Search';
// import Pagination from './Pagination';

// const Home = () => {
//     const [posts, setPosts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);

//     const fetchBlog = (page) => {
//         fetch(`http://localhost:5000/api/blog?page=${page}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setPosts(data.blogs);

//             })
//             .catch((error) => console.log(error));
//     };

//     useEffect(() => {
//         fetchBlog(currentPage);
//     }, [currentPage]);


//     const handlePageChange = (selectedPage) => {
//         const selected = selectedPage.selected + 1;
//         console.log(selected);
//         setCurrentPage(selected);
//     };

//     return (
//         <div className="home">
//             <Search setPosts={setPosts} />
//             <div className="posts">
//                 {posts &&
//                     posts.map((post) => (
//                         <div className="post" key={post.id}>
//                             <div className="img">
//                                 <img
//                                     className="image"
//                                     src={`http://localhost:5000/upload/` + post.image}
//                                     alt="image"
//                                 />
//                             </div>
//                             <div className="content">
//                                 <h1>{post.title}</h1>
//                                 <h4>{post.createdAt}</h4>
//                                 <h6>{post.description}</h6>
//                                 <Link to={`/blog/${post.id}`}>
//                                     <button>Read more</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//             <div className="pagination">
//                 <Pagination
//                     pageCount={10}
//                     currentPage={currentPage}
//                     onPageChange={handlePageChange}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Home;


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


// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import '../../../src/css/Home.css';
// // import Search from './Search';
// // import Pagination from './Pagination';


// // const Home = () => {
// //     const [posts, setPosts] = useState([]);
// //     const [currentPage, setCurrentPage] = useState(1);

// //     const fetchBlog = (page) => {
// //         fetch(`http://localhost:5000/api/blog?page=${page}`)
// //             .then((response) => response.json())
// //             .then((data) => {
// //                 console.log(data.blogs)
// //                 setPosts(data.blogs);

// //             })
// //             .catch((error) => console.log(error));
// //     };

// //     const handlePageChange = (selectedPage) => {
// //         console.log('selectedPage:', selectedPage)

// //         const selected = selectedPage.selected + 1;
// //         // console.log('selectedPage.selected:', selectedPage.selected);
// //         // console.log('Heloo', selected)
// //         setCurrentPage(selected);
// //         console.log('pagechange', selectedPage.selected, selectedPage, selectedPage.selected + 1)
// //     };



// //     useEffect(() => {
// //         fetchBlog(currentPage);
// //     }, [currentPage]);

// //     useEffect(() => {
// //         console.log(posts);
// //     }, [posts]);


// //     return (
// //         <div className="home">

// //             <Search setPosts={setPosts} posts={posts} fetchBlog={fetchBlog} />

// //             <div className="posts">
// //                 {posts && posts.map((post) => (
// //                     <div className="post" key={post.id}>
// //                         <div className="img">
// //                             <img className="image" src={`http://localhost:5000/upload/` + post.image} alt="image" />
// //                         </div>
// //                         <div className="content">
// //                             <h1>{post.title}</h1>
// //                             <h4>{post.createdAt}</h4>
// //                             <h6>{post.description}</h6>
// //                             <Link to={`/blog/${post.id}`}>
// //                                 <button>Read more</button>
// //                             </Link>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //             <Pagination
// //                 currentPage={currentPage}
// //                 handlePageChange={handlePageChange}
// //             />

// //         </div>
// //     );
// // };

// // export default Home;


// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import ReactPaginate from 'react-paginate';
// // import '../../../src/css/Home.css';
// // import Search from './Search';

// // const Home = () => {
// //     const [posts, setPosts] = useState([]);
// //     const [currentPage, setCurrentPage] = useState(1);

// //     const fetchBlog = (page) => {
// //         fetch(`http://localhost:5000/api/blog?page=${page}`)
// //             .then((response) => response.json())
// //             .then((data) => {
// //                 setPosts(data.blogs);
// //             })
// //             .catch((error) => console.log(error));
// //     };

// //     useEffect(() => {
// //         fetchBlog(currentPage);
// //     }, [currentPage]);

// //     useEffect(() => {
// //         console.log(posts);
// //     }, [posts]);

// //     const handlePageChange = (selectedPage) => {
// //         const selected = selectedPage.selected + 1;
// //         setCurrentPage(selected);
// //     };

// //     return (
// //         <div className="home">
// //             <Search setPosts={setPosts} />
// //             <div className="posts">
// //                 {posts &&
// //                     posts.map((post) => (
// //                         <div className="post" key={post.id}>
// //                             <div className="img">
// //                                 <img
// //                                     className="image"
// //                                     src={`http://localhost:5000/upload/` + post.image}
// //                                     alt="image"
// //                                 />
// //                             </div>
// //                             <div className="content">
// //                                 <h1>{post.title}</h1>
// //                                 <h4>{post.createdAt}</h4>
// //                                 <h6>{post.description}</h6>
// //                                 <Link to={`/blog/${post.id}`}>
// //                                     <button>Read more</button>
// //                                 </Link>
// //                             </div>
// //                         </div>
// //                     ))}
// //             </div>
// //             <div className="pagination">
// //                 <ReactPaginate
// //                     previousLabel={'previous'}
// //                     nextLabel={'next'}
// //                     breakLabel={'...'}
// //                     pageCount={10}
// //                     onPageChange={handlePageChange}
// //                     containerClassName={'pagination-container'}
// //                     pageClassName={'pagination-page'}
// //                     activeClassName={'pagination-active'}
// //                     previousClassName={'pagination-previous'}
// //                     nextClassName={'pagination-next'}
// //                     breakClassName={'pagination-break'}
// //                     disabledClassName={'pagination-disabled'}
// //                     initialPage={currentPage - 1}
// //                     key={currentPage}
// //                 />
// //             </div>
// //         </div>
// //     );
// // };

// // export default Home;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../../../src/css/Home.css';
// import Search from './Search';
// import Pagination from './Pagination';

// const Home = () => {
//     const [posts, setPosts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTitle, setSearchTitle] = useState('');

//     const fetchBlog = (page, title = '') => {
//         const url = title
//             ? `http://localhost:5000/api/blog/search?title=${title}&page=${page}`
//             : `http://localhost:5000/api/blog?page=${page}`;

//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 setPosts(data.blogs);
//             })
//             .catch((error) => console.log(error));
//     };

//     useEffect(() => {
//         fetchBlog(currentPage, searchTitle);
//     }, [currentPage, searchTitle]);

//     const handlePageChange = (selectedPage) => {
//         const selected = selectedPage.selected + 1;
//         setCurrentPage(selected);
//     };

//     const handleSearch = (title) => {
//         setSearchTitle(title);
//         setCurrentPage(1);
//     };

//     return (
//         <div className="home">
//             <Search handleSearch={handleSearch} />
//             <div className="posts">
//                 {posts &&
//                     posts.map((post) => (
//                         <div className="post" key={post.id}>
//                             <div className="img">
//                                 <img
//                                     className="image"
//                                     src={`http://localhost:5000/upload/${post.image}`}
//                                     alt="image"
//                                 />
//                             </div>
//                             <div className="content">
//                                 <h1>{post.title}</h1>
//                                 <h4>{post.createdAt}</h4>
//                                 <h6>{post.description}</h6>
//                                 <Link to={`/blog/${post.id}`}>
//                                     <button>Read more</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//             <div className="pagination">
//                 <Pagination
//                     pageCount={10}
//                     currentPage={currentPage}
//                     onPageChange={handlePageChange}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Home;

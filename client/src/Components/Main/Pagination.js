import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
    return (
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName={'pagination-container'}
            pageClassName={'pagination-page'}
            activeClassName={'pagination-active'}
            previousClassName={'pagination-previous'}
            nextClassName={'pagination-next'}
            breakClassName={'pagination-break'}
            disabledClassName={'pagination-disabled'}
            initialPage={currentPage - 1}
        />
    );
};

export default Pagination;


// import React, { useState } from 'react';
// import ReactPaginate from 'react-paginate';

// const Pagination = ({ currentPage, handlePageChange }) => {
//     const [currentPageState, setCurrentPageState] = useState(currentPage);

//     const handlePageClick = (selectedPage) => {
//         const selected = selectedPage.selected + 1;
//         setCurrentPageState(selected);
//         handlePageChange(selected);
//         console.log("page clicked", selectedPage, selectedPage.selected, selectedPage.selected + 1)
//     };

//     return (
//         <div className="pagination">
//             <ReactPaginate
//                 previousLabel={'previous'}
//                 nextLabel={'next'}
//                 breakLabel={'...'}
//                 pageCount={5}
//                 onPageChange={handlePageClick}
//                 containerClassName={'pagination-container'}
//                 pageClassName={'pagination-page'}
//                 activeClassName={'pagination-active'}
//                 previousClassName={'pagination-previous'}
//                 nextClassName={'pagination-next'}
//                 breakClassName={'pagination-break'}
//                 disabledClassName={'pagination-disabled'}
//                 initialPage={currentPageState - 1}
//                 key={currentPageState}
//             />
//         </div>
//     );
// };

// export default Pagination;


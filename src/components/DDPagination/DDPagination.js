import React from "react";
import Pagination from "react-bootstrap/Pagination";

const DDPagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  let active = 5;
  return (
    <>
      <Pagination>
        {pageNumber?.map((item, index) => (
          <Pagination.Item
            onClick={() => paginate(item)}
            active={item === currentPage}
          >
            {item}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default DDPagination;

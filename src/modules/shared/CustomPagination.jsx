/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'

const CustomPagination = ({
  pageNumber,
  pageSize,
  setPagination,
  totalNumberOfRecords,
}) => {
  // Logic for handling pagination
  const handleNextPage = () => {
    setPagination(pageNumber + 1, pageSize)
  }
  const handlePreviousPage = () => {
    setPagination(pageNumber - 1, pageSize)
  }
  let totalPages = Math.ceil(totalNumberOfRecords / pageSize)
  let currentPage = pageNumber

  // Return the Pagination component
  return (
    <Pagination className='d-flex justify-content-start '>
      <Pagination.First
        onClick={() => setPagination(1, pageSize)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      />
      {totalPages > 0 &&
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setPagination(page, pageSize)}
          >
            {page}
          </Pagination.Item>
        ))}
      <Pagination.Next
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => setPagination(totalPages, pageSize)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  )
}

export default CustomPagination

CustomPagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPagination: PropTypes.func.isRequired,
  totalNumberOfRecords: PropTypes.number.isRequired,
}

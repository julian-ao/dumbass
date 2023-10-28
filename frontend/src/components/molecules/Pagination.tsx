import { Dispatch, SetStateAction } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './pagination.css'

type PaginationProps = {
    currentPage: number
    maxPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}

const Pagination = ({
    currentPage,
    maxPage,
    setCurrentPage
}: PaginationProps) => {
    return (
        <div className='paginationDiv'>
            <button
                className='paginationButton'
                style={{ opacity: currentPage <= 1 ? 0.2 : 1 }}
                disabled={currentPage <= 1}
                onClick={() =>
                    currentPage > 1 &&
                    setCurrentPage((prevPage) => prevPage - 1)
                }>
                <FaChevronLeft size={35} color='#999' />
            </button>
            <p className='currentPageText'>{currentPage}</p>
            <button
                className='paginationButton'
                style={{ opacity: maxPage <= currentPage ? 0.2 : 1 }}
                disabled={maxPage <= currentPage}
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
                <FaChevronRight size={35} color='#999' />
            </button>
        </div>
    )
}

export default Pagination

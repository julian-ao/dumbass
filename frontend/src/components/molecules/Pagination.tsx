/**
 * @typedef {Object} PaginationProps
 * @property {number} currentPage - The current active page in the pagination.
 * @property {number} totalPages - The total number of pages available.
 * @property {() => void} onClickPrevious - Callback function to handle the click event on the Previous button.
 * @property {() => void} onClickNext - Callback function to handle the click event on the Next button.
 * @property {boolean} isLoading - Boolean indicating whether the pagination data is loading.
 */
export type PaginationProps = {
    currentPage: number
    totalPages: number
    onClickPrevious: () => void
    onClickNext: () => void
    isLoading: boolean
}

/**
 * The `Pagination` component renders pagination controls.
 *
 * This component provides Previous and Next buttons to navigate through a paginated list. It displays the current page number and total pages.
 * The Previous button is disabled when the current page is the first page, and the Next button is disabled when the current page is the last page.
 * The buttons are also disabled when the `isLoading` prop is true, indicating that the pagination data is loading.
 *
 * If the total number of pages is zero, the component renders nothing.
 *
 * @param {PaginationProps} props - Properties to configure the pagination.
 * @returns {JSX.Element|null} The rendered pagination controls, or null if there are no pages to display.
 */
const Pagination = (props: PaginationProps) => {
    const disablePrevious = props.currentPage <= 1
    const disableNext = props.currentPage >= props.totalPages

    if (props.totalPages === 0) {
        return null
    }

    return (
        <div className='flex justify-center mt-5 mb-10'>
            <nav aria-label='Pagination'>
                <ul className='inline-flex items-center space-x-1 rounded-md text-sm'>
                    <li>
                        <button
                            id='previous-pagination-button'
                            onClick={props.onClickPrevious}
                            disabled={disablePrevious || props.isLoading}
                            className={`inline-flex items-center space-x-2 rounded-md bg-white px-4 py-2 font-medium transition-all shadow-sm ${
                                disablePrevious
                                    ? 'text-gray-300 pointer-events-none'
                                    : 'text-gray-500 hover:bg-gray-50 hover:shadow'
                            }`}>
                            <svg
                                className='h-5 w-5'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'>
                                <path
                                    fillRule='evenodd'
                                    d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                                    clipRule='evenodd'
                                />
                            </svg>
                            <span>Previous</span>
                        </button>
                    </li>
                    <li>
                        <span className='inline-flex items-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm'>
                            {props.isLoading ? (
                                <>Loading...</>
                            ) : (
                                <>
                                    Page{' '}
                                    <b className='mx-1'>{props.currentPage}</b>{' '}
                                    of{' '}
                                    <b className='ml-1'>{props.totalPages}</b>
                                </>
                            )}
                        </span>
                    </li>
                    <li>
                        <button
                            id='next-pagination-button'
                            onClick={props.onClickNext}
                            disabled={disableNext || props.isLoading}
                            className={`inline-flex items-center space-x-2 rounded-md bg-white px-4 py-2 font-medium transition-all shadow-sm ${
                                disableNext
                                    ? 'text-gray-300 pointer-events-none'
                                    : 'text-gray-500 hover:bg-gray-50 hover:shadow'
                            }`}>
                            <span>Next</span>
                            <svg
                                className='h-5 w-5'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'>
                                <path
                                    fillRule='evenodd'
                                    d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination

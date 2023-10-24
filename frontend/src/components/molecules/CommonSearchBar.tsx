import { useCallback, useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Dropdown from '../atoms/Dropdown'

/**
 * @typedef {Object} MusicDataItem
 *
 * @property {'artist' | 'song'} type - Type of the music data item, either an artist or a song.
 * @property {string} name - Name of the artist or song.
 */
export type MusicDataItem = {
    type: 'artist' | 'song'
    name: string
}

/**
 * @typedef {Object} CommonSearchBarProps
 *
 * @property {string} [className] - Optional CSS class string to apply to the root element of the component.
 * @property {string[]} [filterOptions] - Optional list of filter options for narrowing down the search.
 * @property {string} [selectedFilter] - Optional selected filter applied to the search.
 * @property {(newFilter: string) => void} [onFilterChange] - Optional callback function to handle filter changes.
 */
type CommonSearchBarProps = {
    className?: string
    filterOptions?: string[]
    selectedFilter?: string
    onFilterChange?: (newFilter: string) => void
}

/**
 * `CommonSearchBar` component.
 *
 * A versatile search bar component that allows searching through a predefined dataset of music items,
 * and provides an optional filter feature to narrow down the search based on the type of music data
 * (e.g., artist or song). This component manages local state for the search term and whether or not
 * to show a dropdown of matched items, and it navigates to a `/search` route (without query parameters)
 * upon form submission.
 *
 * @param {CommonSearchBarProps} props - Properties to configure the component.
 */
const CommonSearchBar = ({
    className,
    filterOptions,
    selectedFilter,
    onFilterChange
}: CommonSearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const searchBarRef = useRef<HTMLDivElement | null>(null)
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1)
    const navigate = useNavigate()
    const [filteredData, setFilteredData] = useState<MusicDataItem[]>([])

    const data: MusicDataItem[] = [
        { type: 'artist', name: 'Eminem' },
        { type: 'artist', name: 'Jay Z' },
        { type: 'artist', name: 'ABBA' },
        { type: 'song', name: 'Lose Yourself' },
        { type: 'song', name: '99 Problems' },
        { type: 'song', name: 'Dancing Queen' }
    ]

    const handleSearch = useCallback(() => {
        navigate(`/search`)
    }, [navigate])

    useEffect(() => {
        const newFilteredData = data.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!selectedFilter
                    ? true
                    : item.type === selectedFilter.toLowerCase())
        )

        if (searchTerm.trim() !== '') {
            setFilteredData(newFilteredData)
            if (newFilteredData.length > 0) {
                setShowDropdown(true)
                setSelectedOptionIndex(-1)
            } else {
                setShowDropdown(false)
            }
        } else {
            setShowDropdown(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, selectedFilter])

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target as Node)
        ) {
            setShowDropdown(false)
            setSelectedOptionIndex(-1)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [handleClickOutside])

    return (
        <div className={`relative ${className}`} ref={searchBarRef}>
            <form
                role='search'
                autoComplete='off'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }}
                className='flex items-center pl-2 pr-2 bg-[#FFFFFF] rounded-lg h-14'>
                <label htmlFor='searchInput' className='sr-only'>
                    Search for a song or artist
                </label>
                <input
                    type='text'
                    id='searchInput'
                    placeholder='Search for a song or artist'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className='w-full p-2 outline-none rounded-md'
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSearch()
                        }
                    }}
                />
                {filterOptions && selectedFilter && onFilterChange && (
                    <div className='h-full border-l-2 flex justify-center items-center'>
                        <Dropdown
                            selectedFilter={selectedFilter}
                            filterOptions={filterOptions}
                            onFilterChange={onFilterChange}
                        />
                    </div>
                )}
                <button
                    type='submit'
                    className='p-2 rounded-md ml-2'
                    aria-label='Search'
                    data-testid='search-button'>
                    <FaSearch size={20} color='#999' />
                </button>
            </form>
            {showDropdown && (
                <ul className='absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg'>
                    {filteredData.map((item, index) => (
                        <li
                            key={index}
                            className={`p-2 ${
                                index === selectedOptionIndex
                                    ? 'bg-gray-300'
                                    : ''
                            } cursor-pointer hover:bg-gray-200`}
                            onClick={() => {
                                setSearchTerm(item.name)
                                setShowDropdown(false)
                            }}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CommonSearchBar

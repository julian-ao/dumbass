import { useCallback, useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import Dropdown from '../atoms/Dropdown'
import { SEARCHBAR_DROPDOWN } from '../../graphql/queries/searchbarQueries'
import { useSearchParams } from 'react-router-dom'
import { customToast } from '../../lib/utils'

type Artist = {
    id: string
    name: string
}

type Song = {
    id: string
    title: string
}

type SearchResult = Artist | Song

export type MusicDataItem = {
    type: 'artist' | 'song'
    name: string
    id: string
}

type SearchBarProps = {
    filterOptions?: string[]
    selectedFilter?: string
    onFilterChange?: (newFilter: string) => void
    selectedSort?: string
    onSortChange?: (newSort: string) => void
}

const SearchBar = (props: SearchBarProps) => {
    const [searchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState<string>(
        searchParams.get('term') || ''
    )
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const searchBarRef = useRef<HTMLDivElement | null>(null)
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1)
    const navigate = useNavigate()
    const [filteredData, setFilteredData] = useState<MusicDataItem[]>([])
    const client = useApolloClient()

    const transformData = (data: SearchResult[]): MusicDataItem[] => {
        return data.map((item) => {
            return 'name' in item
                ? { type: 'artist', name: item.name, id: item.id }
                : { type: 'song', name: item.title, id: item.id }
        })
    }

    const fetchSearchResults = useCallback(async () => {
        if (searchTerm.trim() === '') {
            setShowDropdown(false)
            setFilteredData([])
            return
        }

        try {
            const { data, error } = await client.query({
                query: SEARCHBAR_DROPDOWN,
                variables: {
                    searchType: props.selectedFilter?.toLowerCase(),
                    searchString: searchTerm,
                    limit: 5,
                    sort: props.selectedSort
                }
            })

            error &&
                customToast('error', 'Something went wrong, please try again')

            const results = transformData(data.searchSearchbar)
            setFilteredData(results)
            setShowDropdown(results.length > 0)
        } catch {
            setShowDropdown(false)
        }
    }, [client, searchTerm, props.selectedFilter, props.selectedSort])

    useEffect(() => {
        fetchSearchResults()
    }, [
        searchTerm,
        props.selectedFilter,
        props.selectedSort,
        fetchSearchResults
    ])

    const handleSearch = useCallback(
        (searchValue: string, id?: number) => {
            setShowDropdown(false)
            if (searchValue.trim() === '') return
            const queryTerm = searchTerm?.toLowerCase()
                ? encodeURIComponent(searchValue?.toLowerCase().trim())
                : ''
            const queryFilter = props.selectedFilter
                ? encodeURIComponent(props.selectedFilter)
                : ''
            const querySort = props.selectedSort?.toLowerCase()
                ? encodeURIComponent(props.selectedSort.toLowerCase())
                : ''

            if (id) {
                navigate(`/${props.selectedFilter}/${id}`)
            } else {
                const searchUrl = `/search?${queryTerm && `term=${queryTerm}`}${
                    queryTerm ? '&' : ''
                }${queryFilter && `filter=${queryFilter}`}${
                    queryFilter ? '&' : ''
                }${querySort && `sort=${querySort}`}`

                navigate(searchUrl)
            }
        },
        [navigate, searchTerm, props.selectedFilter, props.selectedSort]
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false)
                setSelectedOptionIndex(-1)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div
            className='relative w-11/12 sm:w-3/5 mt-10 drop-shadow mb-5 z-40'
            ref={searchBarRef}>
            <h3 className='hidden md:block text-xs m-1 opacity-70'>
                Enter your search term and press 'Enter' to search
            </h3>
            <form
                role='search'
                autoComplete='off'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch(searchTerm)
                }}
                className='flex items-center pl-2 bg-[#FFFFFF] rounded-lg h-14'>
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
                            handleSearch(searchTerm)
                        }
                    }}
                />
                {props.filterOptions &&
                    props.selectedFilter &&
                    props.onFilterChange && (
                        <div className='h-full border-x-[1.5px] flex justify-center items-center'>
                            <Dropdown
                                selectedFilter={props.selectedFilter}
                                filterOptions={props.filterOptions}
                                onFilterChange={props.onFilterChange}
                                title='Filter by'
                            />
                        </div>
                    )}
                <button
                    type='submit'
                    className='p-2 rounded-md hover:bg-gray-50 transition-all h-full w-16 flex justify-center items-center rounded-l-none'
                    aria-label='Search'
                    data-testid='search-button'>
                    <FaSearch
                        size={20}
                        color='#999'
                        data-testid='search-icon'
                    />
                </button>
            </form>
            {showDropdown && (
                <ul className='absolute top-full mt-1 w-full flex flex-col bg-white border border-gray-200 rounded-md shadow-lg'>
                    {filteredData.map((item, index) => (
                        <button
                            key={index}
                            className={`p-2 ${
                                index === selectedOptionIndex
                                    ? 'bg-gray-300'
                                    : ''
                            } cursor-pointer hover:bg-gray-200 w-full text-left`}
                            onClick={() => {
                                setSearchTerm(item.name)
                                setShowDropdown(false)
                                handleSearch(item.name, parseInt(item.id))
                            }}>
                            {item.name}
                        </button>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar

import { useCallback, useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import Dropdown from '../atoms/Dropdown';
import { SEARCHBAR_DROPDOWN } from '../../graphql/queries/searchbarQueries';

// Definerer typer for søketreffene
type Artist = {
  id: string;
  name: string;
};

type Song = {
  id: string;
  title: string;
};

type SearchResult = Artist | Song;

export type MusicDataItem = {
  type: 'artist' | 'song';
  name: string;
  id: string;
};

type CommonSearchBarProps = {
  className?: string;
  filterOptions?: string[];
  selectedFilter?: string;
  onFilterChange?: (newFilter: string) => void;
};

const CommonSearchBar = ({
    className,
    filterOptions,
    selectedFilter,
    onFilterChange
}: CommonSearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState<MusicDataItem[]>([]);
    const client = useApolloClient();

    const transformData = (data: SearchResult[]): MusicDataItem[] => {
        return data.map((item) => {
            return 'name' in item
                ? { type: 'artist', name: item.name, id: item.id }
                : { type: 'song', name: item.title, id: item.id };
        });
    };

    const fetchSearchResults = useCallback(async () => {
        if (searchTerm.trim() === '') {
            setShowDropdown(false);
            setFilteredData([]);
            return;
        }

        try {
            console.log("selectedFilter: ", selectedFilter)
            const { data } = await client.query({
                query: SEARCHBAR_DROPDOWN,
                variables: {
                    searchType: selectedFilter?.toLowerCase(),
                    searchString: searchTerm,
                    limit: 5
                },
            });

            console.log("data: ", data)

            const results = transformData(data.searchSearchbar);
            setFilteredData(results);
            setShowDropdown(results.length > 0);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setShowDropdown(false);
        }
    }, [client, searchTerm, selectedFilter]);

    useEffect(() => {
        fetchSearchResults();
    }, [searchTerm, selectedFilter, fetchSearchResults]);

    const handleSearch = useCallback((searchValue: string) => {
        // Sjekk at både searchTerm og selectedFilter er definert.
        const queryTerm = searchTerm ? encodeURIComponent(searchValue) : '';
        const queryFilter = selectedFilter ? encodeURIComponent(selectedFilter) : '';
      
        // Bygg opp URL-en med de tilgjengelige verdiene.
        const searchUrl = `/search?${queryTerm && `term=${queryTerm}`}${queryTerm && queryFilter ? '&' : ''}${queryFilter && `filter=${queryFilter}`}`;
        
        navigate(searchUrl);
    }, [navigate, searchTerm, selectedFilter]);
      

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
                setSelectedOptionIndex(-1);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
                            handleSearch(searchTerm)
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
                                handleSearch(item.name)
                            }}>
                            {item.name}
                        </button>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CommonSearchBar

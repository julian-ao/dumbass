import { useCallback, useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../atoms/Dropdown';

export type MusicDataItem = {
    type: 'artist' | 'song';
    name: string;
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
    const [filteredData, setFilteredData] = useState<MusicDataItem[]>([])

    const data: MusicDataItem[] = [
        { type: 'artist', name: 'Eminem' },
        { type: 'artist', name: 'Jay Z' },
        { type: 'artist', name: 'ABBA' },
        { type: 'song', name: 'Lose Yourself' },
        { type: 'song', name: '99 Problems' },
        { type: 'song', name: 'Dancing Queen' }
    ];

    const handleSearch = useCallback(() => {
        navigate(`/search`);
    }, [navigate]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            const newFilteredData = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!selectedFilter ? true : item.type === selectedFilter.toLowerCase())
            );
            setFilteredData(newFilteredData);
            if (newFilteredData.length > 0) {
                setShowDropdown(true);
                setSelectedOptionIndex(-1);
            } else {
                setShowDropdown(false);
            }
        } else {
            setShowDropdown(false);
        }
    }, [searchTerm, selectedFilter]);
    

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
            setSelectedOptionIndex(-1);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className={`relative ${className}`} ref={searchBarRef}>
            <div className='flex items-center pl-2 pr-2 bg-[#FFFFFF] rounded-lg h-14'>
                <input
                    type='text'
                    placeholder='Search for a song or artist'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className='w-full p-2 outline-none rounded-md'
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSearch();
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
                <button className='p-2 rounded-md ml-2' onClick={handleSearch}>
                    <FaSearch size={20} color='#999' />
                </button>
            </div>
            {showDropdown && (
                <div className='absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg'>
                    {data
                        .filter((item) =>
                            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                            (!selectedFilter ? true : item.type === selectedFilter.toLowerCase())
                        )
                        .map((item, index) => (
                            <div
                                key={index}
                                className={`p-2 ${
                                    index === selectedOptionIndex ? 'bg-gray-300' : ''
                                } cursor-pointer hover:bg-gray-200`}
                                onClick={() => {
                                    setSearchTerm(item.name);
                                    setShowDropdown(false);
                                }}>
                                {item.name}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default CommonSearchBar;

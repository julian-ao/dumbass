import { useEffect, useRef, useState, useCallback } from "react";
import { FaSearch } from 'react-icons/fa';
import Dropdown from "../../atoms/Dropdown";

type SearchBarProps = {
    className?: string;
    filterOptions: string[];
    selectedFilter: string;
    onFilterChange: (newFilter: string) => void;
}

type MusicDataItem = {
    type: 'artist' | 'song' | 'album';
    name: string;
};

const SearchBar = ({
    className,
    filterOptions,
    selectedFilter,
    onFilterChange,
} : SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

    const data: MusicDataItem[] = [
        { type: 'artist', name: 'Eminem' },
        { type: 'artist', name: 'Jay Z' },
        { type: 'artist', name: 'ABBA' },
        { type: 'song', name: 'Lose Yourself' },
        { type: 'song', name: '99 Problems' },
        { type: 'song', name: 'Dancing Queen' },
        { type: 'album', name: 'The Eminem Show' },
        { type: 'album', name: 'The Blueprint' },
        { type: 'album', name: 'Gold' },
    ];

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            setShowDropdown(true);
            setSelectedOptionIndex(-1);
        } else {
            setShowDropdown(false);
        }
    }, [searchTerm]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target as Node)
        ) {
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
            <div className="flex items-center p-2 bg-[#FFFFFF] rounded-lg">
                <input
                    type="text"
                    placeholder="Search for a song, artist, or album..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full p-2 outline-none rounded-md"
                />
                <Dropdown 
                    selectedFilter={selectedFilter}
                    filterOptions={filterOptions}
                    onFilterChange={onFilterChange}
                />
                <button className="p-2 rounded-md ml-2">
                    <FaSearch size={20} color="#999" />
                </button>
            </div>
            {showDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                    {data
                        .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.type === selectedFilter.toLowerCase())
                        .map((item, index) => (
                            <div
                                key={index}
                                className={`p-2 ${index === selectedOptionIndex ? 'bg-gray-300' : ''} cursor-pointer hover:bg-gray-200`}
                                onClick={() => {
                                    setSearchTerm(item.name);
                                    setShowDropdown(false);
                                }}
                            >
                                {item.name}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

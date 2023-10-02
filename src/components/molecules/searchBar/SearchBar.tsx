import { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import './searchBar.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

    const data = ["Eminem", "Jay Z"];

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            setShowDropdown(true);
            setSelectedOptionIndex(-1);
        } else {
            setShowDropdown(false);
        }
    }, [searchTerm]);

    // Handle click outside of search bar and set showDropdown false
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target as Node)
        ) {
            setShowDropdown(false);
            setSelectedOptionIndex(-1);
        }
    }, []);

    // Add event listener for click outside of search bar
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="searchContainer" ref={searchBarRef}>
            <div
                className="searchBar"
                style={{
                    borderBottomLeftRadius:
                        showDropdown && data.length > 0 ? 0 : '10px',
                    borderBottomRightRadius:
                        showDropdown && data.length > 0 ? 0 : '10px',
                }}
            >
                <input
                    type="text"
                    placeholder="Søk etter en sang, artist, eller album..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="searchButton">
                    <FaSearch size={25} color="#999" />
                </button>
            </div>
            {showDropdown && data && (
                <div
                    className="searchDropdown"
                    style={{
                        borderTop: data.length > 0 ? '1px solid #C7C7C7' : 'none',
                    }}
                >
                    {data
                        .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((item, index) => (
                            <div 
                                key={index} 
                                className={`searchDropdownItem ${index === selectedOptionIndex ? 'selectedDropdownItem' : ''}`}
                                onClick={() => {
                                    setSearchTerm(item);
                                    setShowDropdown(false);
                                }}
                            >
                                {item}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

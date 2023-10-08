import { useState } from "react";
import Navbar from "../components/molecules/Navbar";
import SearchBar from "../components/molecules/SearchBar";
import Filter from "../components/molecules/Sort";

function SearchPage(){
    const [filter, setFilter] = useState('Song');

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <SearchBar
                    className="w-4/5 mt-10 drop-shadow mb-10"
                    filterOptions={['Song', 'Artist']}
                    selectedFilter={filter}
                    onFilterChange={(newFilter) => setFilter(newFilter)}
                />
            </div>
            <div className="flex justify-center">
                <Filter />
            </div>
        </div>
    );
};

export default SearchPage;

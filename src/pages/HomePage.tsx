import { useState } from "react";
import SearchBar from "../components/molecules/searchBar/SearchBar";

export default function HomePage() {
    const [filter, setFilter] = useState("Song");

    return (
        <div className="bg-[#EFEFEF] min-h-screen">
            <div className="flex items-center justify-center h-16 bg-[#FAF3DD] drop-shadow">
            </div>
            <div className="flex justify-center">
                <SearchBar
                    className="w-4/5 mt-10 drop-shadow"
                    filterOptions={["Song", "Artist"]} 
                    selectedFilter={filter}
                    onFilterChange={(newFilter) => setFilter(newFilter)}
                />
            </div>
        </div>
    );
}

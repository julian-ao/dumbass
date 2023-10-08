import Navbar from "../components/molecules/Navbar";
import { Sort } from "../components/atoms/Sort";
import { SearchBarWithoutFilter } from "../components/molecules/SearchBarWithoutFilter";
import { Filter } from "../components/atoms/Filter";

function SearchPage(){

    return (
        <div className="bg-[#EFEFEF] min-h-screen">
            <Navbar />
            <div className="w-screen px-12">
                <div className="flex justify-center">
                    <SearchBarWithoutFilter 
                        className="w-4/5 mt-10 drop-shadow mb-10"
                    />
                </div>
                <div className="flex justify-center gap-10">
                    <Filter />
                    <Sort />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

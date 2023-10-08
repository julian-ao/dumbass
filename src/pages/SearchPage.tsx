import { useState } from 'react';
import Paginate from 'react-paginate';
import Navbar from "../components/molecules/Navbar";
import { Sort } from "../components/atoms/Sort";
import { SearchBarWithoutFilter } from "../components/molecules/SearchBarWithoutFilter";
import { Filter } from "../components/atoms/Filter";
import ArtistSongCard, { ArtistCardProps, SongCardProps } from "../components/molecules/ArtistSongCard";

function SearchPage(){
    const FiftycentProps = {
        cardType: 'artist',
        imageUrl:
            'https://www.uka.no/uploads/cache/66/e7/66e75771d31a087bd8754021b203d98c.jpg',
        title: '50 Cent',
        alternateNames: ['Fiddy', 'Boo Boo'],
        rating: 4.5,
        numOfRatings: 1000000,
    } as ArtistCardProps;

    const InDaClubProps = {
        cardType: 'song',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/1/12/50_Cent_-_In_Da_Club_-_CD_cover.jpg',
        title: 'In Da Club',
        artist: '50 Cent',
        rating: 4.5,
        numOfRatings: 1000000,
        releaseDate: '2003-01-07',
    } as SongCardProps;

    const allData = Array(10).fill(InDaClubProps).concat(Array(10).fill(FiftycentProps));

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const handlePageClick = (data: {selected: number}) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentData = allData.slice(offset, offset + itemsPerPage);

    return (
        <div className="bg-[#EFEFEF] min-h-screen">
            <Navbar />
            <div className="w-full px-12">
                <div className="flex justify-center">
                    <SearchBarWithoutFilter 
                        className="w-4/5 mt-10 drop-shadow mb-10"
                    />
                </div>
                <div className="flex justify-center gap-10 mb-10">
                    <Filter />
                    <Sort />
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full sm:w-4/5 mb-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 sm:gap-8 gap-4">
                        {currentData.map((props, index) => (
                            <ArtistSongCard key={index} {...props} />
                        ))}
                    </div>
                    <Paginate
                        previousLabel={'Forrige'}
                        nextLabel={'Neste'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(allData.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination flex justify-center space-x-2 mb-5'}
                        activeClassName={'active bg-blue-200'}
                        pageClassName={'text-black border rounded px-3 py-2 hover:bg-blue-300'}
                        pageLinkClassName={'cursor-pointer'}
                        previousClassName={'text-black border rounded px-3 py-2 hover:bg-blue-300'}
                        nextClassName={'text-black border rounded px-3 py-2 hover:bg-blue-300'}
                        previousLinkClassName={'cursor-pointer'}
                        nextLinkClassName={'cursor-pointer'}
                        disabledClassName={'text-gray-300 border rounded px-3 py-2 opacity-50 cursor-not-allowed'}
                        disabledLinkClassName={'opacity-50 cursor-not-allowed'}
                        breakLinkClassName={'border-b border-black'}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

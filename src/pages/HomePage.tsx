import { useState } from "react";
import SearchBar from "../components/molecules/SearchBar";
import ArtistSongCard, { ArtistCardProps, SongCardProps } from "../components/molecules/ArtistSongCard";

export default function HomePage() {
    const [filter, setFilter] = useState("Song");
    const FiftycentProps = {
        cardType: "artist",
        imageUrl: "https://www.uka.no/uploads/cache/66/e7/66e75771d31a087bd8754021b203d98c.jpg",
        title: "50 Cent",
        alternateNames: ["Fiddy", "Boo Boo"],
        rating: 4.5,
        numOfRatings: 1000000,
    } as ArtistCardProps;
    const InDaClubProps = {
        cardType: "song",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/12/50_Cent_-_In_Da_Club_-_CD_cover.jpg",
        title: "In Da Club",
        artist: "50 Cent",
        rating: 4.5,
        numOfRatings: 1000000,
        releaseDate: "2003-01-07",
    } as SongCardProps;

    return (
        <div className="bg-[#EFEFEF] min-h-screen">
            <div className="flex items-center justify-center h-16 bg-[#FAF3DD] drop-shadow">
            </div>
            <div className="flex flex-col items-center justify-center w-screen px-12">
                <SearchBar
                    className="w-4/5 mt-10 drop-shadow mb-10"
                    filterOptions={["Song", "Artist"]} 
                    selectedFilter={filter}
                    onFilterChange={(newFilter) => setFilter(newFilter)}
                />
                {/* Songs */}
                <div className="w-3/4">
                    <h1 data-testid="top_song_header" className="text-3xl font-bold mt-10 mb-10 text-blueGray self-start">Top Songs</h1>
                    {/* Rendering 6 cards */}
                    <div className="mb-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 sm:gap-8 gap-4">
                        {Array(6).fill(InDaClubProps).map((props, index) => (
                            <ArtistSongCard key={index} {...props} />
                        ))}
                    </div>
                </div>
                
                {/* Artists */}
                <div className="w-3/4">
                    <h1 data-testid="top_artist_header" className="text-3xl font-bold mt-10 mb-10 text-blueGray self-start">Top Artists</h1>
                    {/* Rendering 6 cards */}
                    <div className="mb-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 sm:gap-8 gap-4">
                        {Array(6).fill(FiftycentProps).map((props, index) => (
                            <ArtistSongCard key={index} {...props} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

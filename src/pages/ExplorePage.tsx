import { useState } from 'react'
import SearchBar from '../components/molecules/SearchBar'
import {
    ArtistCardProps,
    SongCardProps
} from '../components/molecules/ArtistSongCard'
import CardView from '../components/views/CardView'

export default function ExplorePage() {
    const [filter, setFilter] = useState('Song')
    const FiftycentProps = {
        cardType: 'artist',
        imageUrl:
            'https://www.uka.no/uploads/cache/66/e7/66e75771d31a087bd8754021b203d98c.jpg',
        title: '50 Cent',
        alternateNames: ['Fiddy', 'Boo Boo'],
        rating: 4.5,
        numOfRatings: 23
    } as ArtistCardProps
    const InDaClubProps = {
        cardType: 'song',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/1/12/50_Cent_-_In_Da_Club_-_CD_cover.jpg',
        title: 'In Da Club',
        artist: '50 Cent',
        rating: 4.5,
        numOfRatings: 93,
        releaseDate: '2003-01-07'
    } as SongCardProps

    return (
        <div className='flex flex-col items-center justify-center w-screen'>
            <SearchBar
                className='w-4/5 mt-10 drop-shadow mb-10'
                filterOptions={['Song', 'Artist']}
                selectedFilter={filter}
                onFilterChange={(newFilter) => setFilter(newFilter)}
            />

            <CardView
                title='Top Songs'
                length={6}
                singleCardData={InDaClubProps}
            />
            <CardView
                title='Top Artists'
                length={6}
                singleCardData={FiftycentProps}
            />
        </div>
    )
}

import { useState } from 'react'
import {
    ArtistCardProps,
    SongCardProps
} from '../components/molecules/ArtistSongCard'
import CardView from '../components/views/CardView'
import CommonSearchBar from '../components/molecules/CommonSearchBar'

export default function ExplorePage() {
    const [filter, setFilter] = useState('Song')
    const FiftycentProps = {
        cardType: 'artist',
        imageUrl:
            'https://www.uka.no/uploads/cache/66/e7/66e75771d31a087bd8754021b203d98c.jpg',
        id: '123',
        title: '50 Cent',
        alternateNames: ['Fiddy', 'Boo Boo'],
        rating: 4.5,
        numOfRatings: 23
    } as ArtistCardProps
    const InDaClubProps = {
        cardType: 'song',
        imageUrl:
            'https://i.scdn.co/image/ab67616d0000b273f7f74100d5cc850e01172cbf',
        id: '123',
        title: 'In Da Club',
        artist: '50 Cent',
        rating: 4.5,
        numOfRatings: 93,
        releaseDate: '2003-01-07'
    } as SongCardProps

    const inDaClubArray = Array(6).fill(InDaClubProps)

    const fiftyCentArray = Array(6).fill(FiftycentProps)

    return (
        <div className='flex flex-col items-center justify-center w-screen'>
            <CommonSearchBar
                className='w-4/5 mt-10 drop-shadow mb-10'
                filterOptions={['Song', 'Artist']}
                selectedFilter={filter}
                onFilterChange={(newFilter) => setFilter(newFilter)}
            />
            <CardView title='Top Songs' cardData={inDaClubArray} />
            <CardView title='Top Artists' cardData={fiftyCentArray} />
        </div>
    )
}

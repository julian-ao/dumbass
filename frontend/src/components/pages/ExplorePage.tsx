import { useState } from 'react'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import CommonSearchBar from '../molecules/CommonSearchBar'

/**
 * @component ExplorePage
 *
 * `ExplorePage` is a React functional component that displays a page where users
 * can explore various artists and songs using a search bar and view them via card layouts.
 */
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
        <main className='flex flex-col items-center justify-center w-screen'>
            <CommonSearchBar
                className='w-4/5 mt-10 drop-shadow mb-10'
                filterOptions={['Song', 'Artist']}
                selectedFilter={filter}
                onFilterChange={(newFilter) => setFilter(newFilter)}
            />
            <section className='w-full flex justify-center'>
                <CardView title='Top Songs' cardData={inDaClubArray} />
            </section>
            <section className='w-full flex justify-center'>
                <CardView title='Top Artists' cardData={fiftyCentArray} />
            </section>
        </main>
    )
}

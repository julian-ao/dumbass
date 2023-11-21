import { useState } from 'react'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import SearchBar from '../molecules/SearchBar'
import { GET_ARTISTS_ON_NAME } from '../../graphql/queries/artistQueries'
import { GET_SONGS_ON_TITLE } from '../../graphql/queries/songQueries'
import { useQuery } from '@apollo/client'
import { customToast } from '../../lib/utils'
import { ClipLoader } from 'react-spinners'
import { Artist, Song } from '../../lib/types'

/**
 * `HomePage` Component.
 *
 * This component serves as the homepage of the application. It features a `SearchBar` for searching songs or artists and two `CardView` sections to display top-rated songs and artists.
 * 
 * The component fetches data for top-rated artists and songs using GraphQL queries and Apollo Client. The fetched data is transformed into props for `CardView` components.
 * The `SearchBar` component is configured to filter results based on the user's selection.
 * 
 * The page handles loading states with a spinner and displays error messages if the data fetching fails.
 * The filter option in the `SearchBar` can be toggled between songs and artists to change the displayed data in the dropdown accordingly.
 *
 * @returns {JSX.Element} The rendered HomePage component with a search bar and sections displaying top-rated songs and artists.
 */
export default function HomePage() {
    const [filter, setFilter] = useState('Song')
    const limitPerPage = 12

    const {
        loading: loadingArtists,
        error: errorArtists,
        data: dataArtists
    } = useQuery(GET_ARTISTS_ON_NAME, {
        variables: { limit: limitPerPage, sort: 'rating', page: 1 }
    })

    const {
        loading: loadingSongs,
        error: errorSongs,
        data: dataSongs
    } = useQuery(GET_SONGS_ON_TITLE, {
        variables: { limit: limitPerPage, sort: 'rating', page: 1 }
    })

    if (errorArtists || errorSongs) {
        customToast('error', 'Error', 'Could not load data')
        console.log(JSON.stringify(errorArtists || errorSongs, null, 2))
    }

    const artists: Artist[] = dataArtists?.getArtistsOnName || []
    const songs: Song[] = dataSongs?.getSongsOnTitle || []

    const artistCardData: ArtistCardProps[] = artists.map((artist: Artist) => ({
        cardType: 'artist',
        id: artist.id,
        title: artist.name,
        alternateNames: artist.alternate_names,
        imageUrl: artist.image_url,
        rating: artist.average_rating,
        numOfRatings: artist.number_of_ratings
    }))

    const songCardData: SongCardProps[] = songs.map((song: Song) => ({
        cardType: 'song',
        id: song.id,
        title: song.title,
        artist: song.artist_names,
        imageUrl: song.header_image_url,
        rating: song.average_rating,
        numOfRatings: song.number_of_ratings,
        releaseDate: song.release_date
    }))

    return (
        <main className='flex flex-col items-center justify-center w-screen'>
            <SearchBar
                filterOptions={['song', 'artist']}
                selectedFilter={filter}
                onFilterChange={(newFilter) => setFilter(newFilter)}
            />
            {loadingArtists || loadingSongs ? (
                <div className='h-96 flex items-center'>
                    <ClipLoader color={'#8fc0a9'} size={100} />
                </div>
            ) : (
                <>
                    {errorArtists || errorSongs ? (
                        <div className='h-96 flex items-center'>
                            <h1 className='text-blueGray text-2xl'>
                                Something wrong happened, please try again...
                            </h1>
                        </div>
                    ) : (
                        <>
                            <section className='w-full flex justify-center'>
                                <CardView
                                    title='Top Rated Songs'
                                    cardData={songCardData}
                                />
                            </section>
                            <section className='w-full flex justify-center'>
                                <CardView
                                    title='Top Rated Artists'
                                    cardData={artistCardData}
                                />
                            </section>
                        </>
                    )}
                </>
            )}
        </main>
    )
}

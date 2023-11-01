import { useState } from 'react'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import CommonSearchBar from '../molecules/CommonSearchBar'
import { GET_TOP_ARTISTS } from '../../graphql/queries/artistQueries'
import { GET_TOP_SONGS } from '../../graphql/queries/songQueries'
import { useQuery } from '@apollo/client'
import { customToast } from '../../lib/utils'
import { ClipLoader } from 'react-spinners'

// Define a type for an artist
type Artist = {
    id: string
    name: string
    image_url: string
    alternate_names: string[]
    average_rating: number
    number_of_ratings: number
}

// Define a type for a song
type Song = {
    id: string
    title: string
    artist_names: string
    header_image_url: string
    release_date: string
    primary_artist_id: number
    average_rating: number
    number_of_ratings: number
}

/**
 * @component ExplorePage
 *
 * `ExplorePage` is a React functional component that displays a page where users
 * can explore various artists and songs using a search bar and view them via card layouts.
 */
export default function HomePage() {
    const [filter, setFilter] = useState('Song')
    const limitData = 12

    // Define GraphQL queries using the useQuery hook
    const {
        loading: loadingArtists,
        error: errorArtists,
        data: dataArtists
    } = useQuery(GET_TOP_ARTISTS, {
        variables: { limit: limitData }
    })
    const {
        loading: loadingSongs,
        error: errorSongs,
        data: dataSongs
    } = useQuery(GET_TOP_SONGS, {
        variables: { limit: limitData }
    })

    if (errorArtists || errorSongs) {
        console.log(
            `Error: ${JSON.stringify(errorArtists || errorSongs, null, 2)}`
        )

        customToast('error', 'Error', 'Could not load data')
    }

    // Combine and display data
    const artists: Artist[] = dataArtists?.getTopArtists || []
    const songs: Song[] = dataSongs?.getTopSongs || []

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
            <CommonSearchBar
                className='w-4/5 mt-10 drop-shadow mb-10'
                filterOptions={['Song', 'Artist']}
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
                                Error loading data :/
                            </h1>
                        </div>
                    ) : (
                        <>
                            <section className='w-full flex justify-center'>
                                <CardView
                                    title='Top Songs'
                                    cardData={songCardData}
                                />
                            </section>
                            <section className='w-full flex justify-center'>
                                <CardView
                                    title='Top Artists'
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

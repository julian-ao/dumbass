import { useState } from 'react'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import SearchBar from '../molecules/SearchBar'
import { GET_TOP_ARTISTS } from '../../graphql/queries/artistQueries'
import { GET_TOP_SONGS } from '../../graphql/queries/songQueries'
import { useQuery } from '@apollo/client'
import { customToast } from '../../lib/utils'
import { ClipLoader } from 'react-spinners'
import { Artist, Song } from '../../lib/types'

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

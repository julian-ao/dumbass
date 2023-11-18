import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { RootState } from '../../redux/store'
import { Artist, Song } from '../../lib/types'
import { ClipLoader } from 'react-spinners'
import Breadcrumb from '../atoms/Breadcrumb'
import CardView from '../organisms/CardView'
import { GET_FAVORITES } from '../../graphql/queries/favoriteQueries'
import { GET_SONGS_BY_ID } from '../../graphql/queries/songQueries'
import { GET_ARTISTS_BY_ID } from '../../graphql/queries/artistQueries'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'

type Favorite = {
    type: string
    targetId: number
}

export default function FavoritesPage() {
    const username = useSelector((state: RootState) => state.user.username)
    const itemsPerPage = 12
    const offset = 0 * itemsPerPage
    const [songFavorites, setSongFavorites] = useState<number[]>([])
    const [artistFavorites, setArtistFavorites] = useState<number[]>([])

    // Query for getting favorites, with skip option based on username presence
    const {
        data: favoritesData,
        loading: favoritesLoading,
        error: favoritesError
    } = useQuery(GET_FAVORITES, {
        variables: { username },
        skip: !username, // This skips the query if username is falsy,
        fetchPolicy: 'cache-first'
    })

    useEffect(() => {
        if (favoritesData && favoritesData.getFavorites) {
            const songs = favoritesData.getFavorites
                .filter((item: Favorite) => item.type === 'song')
                .map((item: Favorite) => item.targetId)
            setSongFavorites(songs.slice(offset, offset + itemsPerPage))

            const artists = favoritesData.getFavorites
                .filter((item: Favorite) => item.type === 'artist')
                .map((item: Favorite) => item.targetId)
            setArtistFavorites(artists.slice(offset, offset + itemsPerPage))
        }
    }, [favoritesData, offset, itemsPerPage])

    // Queries for songs and artists by IDs, with skip options
    const {
        data: dataSongs,
        loading: loadingSongs,
        error: errorSongs
    } = useQuery(GET_SONGS_BY_ID, {
        variables: { ids: songFavorites },
        skip: songFavorites.length === 0
    })

    const {
        data: dataArtists,
        loading: loadingArtists,
        error: errorArtists
    } = useQuery(GET_ARTISTS_BY_ID, {
        variables: { ids: artistFavorites },
        skip: artistFavorites.length === 0
    })

    // Processing and mapping data for Card components
    const artists: Artist[] = dataArtists?.getArtistsByIds || []
    const songs: Song[] = dataSongs?.getSongsByIds || []

    const artistCardData = artists.map(
        (artist: Artist): ArtistCardProps => ({
            cardType: 'artist',
            id: artist.id,
            title: artist.name,
            alternateNames: artist.alternate_names,
            imageUrl: artist.image_url,
            rating: artist.average_rating,
            numOfRatings: artist.number_of_ratings
        })
    )

    const songCardData = songs.map(
        (song: Song): SongCardProps => ({
            cardType: 'song',
            id: song.id,
            title: song.title,
            artist: song.artist_names,
            imageUrl: song.header_image_url,
            rating: song.average_rating,
            numOfRatings: song.number_of_ratings,
            releaseDate: song.release_date
        })
    )

    // Rendering the component
    if (!username) {
        return (
            <div className='h-96 flex items-center justify-center'>
                <h1>Need to be logged in to add favorites...</h1>
            </div>
        )
    }

    return (
        <main className='w-full flex flex-col'>
            <Breadcrumb items={[{ name: 'Favorites' }]} />
            <section className='w-full flex flex-col justify-center items-center mt-5'>
                {favoritesLoading || loadingSongs || loadingArtists ? (
                    <div className='h-96 flex items-center'>
                        <ClipLoader color={'#8fc0a9'} size={100} />
                    </div>
                ) : errorArtists || errorSongs || favoritesError ? (
                    <div className='h-96 flex items-center'>
                        <h1 className='text-blueGray text-2xl'>
                            Error loading data :/
                        </h1>
                    </div>
                ) : (
                    <>
                        <section className='w-full flex justify-center'>
                            <CardView
                                title='Favorited Songs'
                                cardData={songCardData}
                            />
                        </section>
                        <section className='w-full flex justify-center'>
                            <CardView
                                title='Favorited Artists'
                                cardData={artistCardData}
                            />
                        </section>
                    </>
                )}
            </section>
        </main>
    )
}

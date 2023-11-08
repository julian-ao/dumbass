import { useState } from 'react'
import Paginate from 'react-paginate'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import Breadcrumb from '../atoms/Breadcrumb'
import { GET_FAVORITES } from '../../graphql/queries/favoriteQueries'
import { GET_SONGS_BY_ID } from '../../graphql/queries/songQueries'
import { GET_ARTISTS_BY_ID } from '../../graphql/queries/artistQueries'
import { useQuery } from '@apollo/client'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Artist, Song } from '../../lib/types'
import { ClipLoader } from 'react-spinners'

/**
 * @component FavoritesPage
 *
 * `FavoritesPage` is a React functional component that provides an interface for users
 * to interact with their favorite songs and artists.
 */
export default function FavoritesPage() {
    const username = useSelector((state: RootState) => state.user.username)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 12
    const offset = currentPage * itemsPerPage
    const [songFavorites, setSongFavorites] = useState<number[]>([])
    const [artistFavorites, setArtistFavorites] = useState<number[]>([])

    if (!username) {
        return (
            <div className='h-96 flex items-center justify-center'>
                <h1>Need to be logged in to add favorites...</h1>
            </div>
        )
    }
    const {
        data: favoritesData,
        loading: favoritesLoading,
        error: favoritesError
    } = useQuery(GET_FAVORITES, {
        variables: { username: username }
    })

    // Use useEffect to make the queries for song and artist data
    useEffect(() => {
        if (username) {
            if (favoritesError) {
                console.log(JSON.stringify(favoritesError, null, 2))
            } else if (favoritesData && favoritesData.getFavorites) {
                setSongFavorites(
                    favoritesData.getFavorites
                        .filter(
                            (item: { type: string }) => item.type === 'song'
                        )
                        .map((item: { targetId: number }) => item.targetId)
                        .slice(offset, offset + itemsPerPage)
                )
                setArtistFavorites(
                    favoritesData.getFavorites
                        .filter(
                            (item: { type: string }) => item.type === 'artist'
                        )
                        .map((item: { targetId: number }) => item.targetId)
                        .slice(offset, offset + itemsPerPage)
                )
            }
        }
    }, [favoritesData])

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected)
    }

    const {
        data: dataSongs,
        loading: loadingSongs,
        error: errorSongs
    } = useQuery(GET_SONGS_BY_ID, {
        variables: { ids: songFavorites }
    })

    const {
        data: dataArtists,
        loading: loadingArtists,
        error: errorArtists
    } = useQuery(GET_ARTISTS_BY_ID, {
        variables: { ids: artistFavorites }
    })

    const artists: Artist[] = dataArtists?.getArtistsByIds || []
    const songs: Song[] = dataSongs?.getSongsByIds || []

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

    const totalDataCount = songCardData.length + artistCardData.length
    const pageCount = Math.ceil(totalDataCount / itemsPerPage)

    return (
        <main className='w-full flex flex-col'>
            <Breadcrumb
                items={[
                    {
                        name: 'Favorites'
                    }
                ]}
            />
            <section className='w-full flex flex-col justify-center items-center'>
                {loadingArtists || loadingSongs || favoritesLoading ? (
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
                    </>
                )}
                <Paginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(pageCount)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={
                        'pagination flex justify-center space-x-2 mb-5'
                    }
                    activeClassName={
                        'active bg-blue-200 flex items-center justify-center'
                    }
                    pageClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    pageLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    previousClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    nextClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    previousLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    nextLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    disabledClassName={
                        'text-gray-300 border rounded px-3 py-2 opacity-50 cursor-not-allowed flex items-center justify-center'
                    }
                    disabledLinkClassName={
                        'opacity-50 cursor-not-allowed w-full h-full flex items-center justify-center'
                    }
                    breakLinkClassName={
                        'border-b border-black w-full h-full flex items-center justify-center'
                    }
                />
            </section>
        </main>
    )
}

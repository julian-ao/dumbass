import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Artist, Song } from '../../lib/types'
import { ClipLoader } from 'react-spinners'
import Breadcrumb from '../atoms/Breadcrumb'
import CardView from '../organisms/CardView'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import { useFavorites } from '../../hooks/useFavorites'

/**
 * `FavoritesPage` Component.
 *
 * This component displays the user's favorite songs and artists. It fetches favorite data using the `useFavorites` hook,
 * which returns lists of favorite songs and artists. The component maps this data into `ArtistCardProps` and `SongCardProps` to be
 * used with the `CardView` component for display.
 *
 * The page features a breadcrumb navigation and two sections: one for favorited songs and another for favorited artists.
 * Each section uses the `CardView` component to render the corresponding cards.
 *
 * The component also handles loading and error states. When the data is loading, a spinner is shown.
 * If there's an error in fetching the data, an error message is displayed. If the user is not logged in,
 * a message prompts them to log in to view favorites.
 *
 * @returns {JSX.Element} The rendered FavoritesPage component.
 */
export default function FavoritesPage() {
    const username = useSelector((state: RootState) => state.user.username)

    const { dataSongs, loading, error, dataArtists } = useFavorites(username)

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

    if (!username) {
        return (
            <div className='h-96 flex items-center justify-center text-blueGray italic'>
                <h1>You need to be logged in to add favorites...</h1>
            </div>
        )
    }

    return (
        <main className='w-full flex flex-col'>
            <Breadcrumb items={[{ name: 'Favorites' }]} />
            <section className='w-full flex flex-col justify-center items-center mt-5'>
                {loading ? (
                    <div className='h-96 flex items-center'>
                        <ClipLoader color={'#8fc0a9'} size={100} />
                    </div>
                ) : error ? (
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
                                customErrorMessage='You have no favorite songs...'
                            />
                        </section>
                        <section className='w-full flex justify-center'>
                            <CardView
                                title='Favorited Artists'
                                cardData={artistCardData}
                                customErrorMessage='You have no favorite artists...'
                            />
                        </section>
                    </>
                )}
            </section>
        </main>
    )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { formatDateString } from '../../lib/utils'
import RatingStars from '../atoms/RatingStars'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * @typedef {Object} ArtistCardProps
 *
 * @property {'artist'} cardType - Specifies the type of card as an artist.
 * @property {string} id - A unique identifier for the artist.
 * @property {string} title - The name of the artist.
 * @property {string[]} alternateNames - An array containing alternate names for the artist.
 * @property {number} rating - The artist's rating.
 * @property {number} numOfRatings - The number of ratings received by the artist.
 * @property {string} [imageUrl] - URL of the artist's image.
 */

/**
 * @typedef {Object} SongCardProps
 *
 * @property {'song'} cardType - Specifies the type of card as a song.
 * @property {string} id - A unique identifier for the song.
 * @property {string} title - The title of the song.
 * @property {string} artist - The name of the artist who performed the song.
 * @property {number} rating - The song's rating.
 * @property {number} numOfRatings - The number of ratings received by the song.
 * @property {string} releaseDate - The release date of the song in ISO 8601 format (YYYY-MM-DD).
 * @property {string} [imageUrl] - URL of the song's image.
 */
export type ArtistCardProps = {
    cardType: 'artist'
    imageUrl?: string
    id: string
    title: string
    alternateNames: string[]
    rating: number
    numOfRatings: number
}

export type SongCardProps = {
    cardType: 'song'
    imageUrl?: string
    id: string
    title: string
    artist: string
    rating: number
    numOfRatings: number
    releaseDate: string
}

/**
 * `ArtistSongCard` component to display either an artist or a song card.
 *
 * Depending on the `cardType` prop, the component displays relevant information for an artist or a song.
 * For an artist card, it shows artist name, alternate names (if any), and rating.
 * For a song card, it shows song title, artist name, rating, and release date.
 * Each card is clickable and redirects to the detailed view of the respective artist or song.
 *
 * @param {ArtistCardProps | SongCardProps} props - Props passed to the component.
 */
const ArtistSongCard = (props: ArtistCardProps | SongCardProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    let subtitle = ''
    let urlTo = `/song/${props.id}`
    if (props.cardType === 'artist') {
        urlTo = `/artist/${props.id}`
    }

    if (props.cardType === 'artist') {
        subtitle = props.alternateNames.length
            ? `AKA: ${props.alternateNames.join(', ')}`
            : props.title
    } else if (props.cardType === 'song') {
        subtitle = `by ${props.artist}`
    }

    const isRootPath = location.pathname === '/'

    return (
        <button
            onClick={() =>
                navigate(urlTo, {
                    state: isRootPath ? undefined : { from: location.pathname }
                })
            }
            className='sm:p-3 p-2 gap-3 rounded-xl flex items-center bg-white text-blueGray cursor-pointer shadow hover:shadow-lg transition-all w-full'>
            <img
                className='aspect-square rounded-xl w-16 h-16 sm:w-24 sm:h-24 object-cover'
                src={props.imageUrl}
                alt='Image'
                data-testid='ArtistSongCard-image'
            />

            <div className='flex flex-col justify-between items-start w-full truncate sm:gap-2'>
                <section className='flex flex-col items-start w-full max-w-full text-left'>
                    <h2
                        className='text-lg font-medium font-sans w-full truncate'
                        data-testid='ArtistSongCard-title'>
                        {props.title}
                    </h2>

                    <h3
                        className='text-sm sm:block hidden -mt-1 w-full truncate '
                        role='ArtistSongCard-subtitle'>
                        {subtitle}
                    </h3>
                </section>
                <section className='text-sm flex sm:gap-x-5 gap-x-2 gap-y-0 max-[400px]:flex-col flex-wrap'>
                    <RatingStars
                        rating={props.rating}
                        changeToOne={true}
                        color='yellow'
                        numOfRatings={props.numOfRatings}
                    />
                    {props.cardType === 'song' && (
                        <div className='flex gap-1 items-center'>
                            <div
                                className='truncate'
                                role='ArtistSongCard-releaseDate'>
                                {formatDateString(props.releaseDate)}
                            </div>
                            <FontAwesomeIcon icon={faCalendarDays} />
                        </div>
                    )}
                </section>
            </div>
        </button>
    )
}

export default ArtistSongCard

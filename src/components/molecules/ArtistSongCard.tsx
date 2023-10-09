import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { formatDateString } from '../../lib/utils'
import RatingStars from '../atoms/RatingStars'
import { Link } from 'react-router-dom'

export type ArtistCardProps = {
    cardType: 'artist'
    imageUrl?: string
    title: string
    alternateNames: string[]
    rating: number
    numOfRatings: number
}

export type SongCardProps = {
    cardType: 'song'
    imageUrl?: string
    title: string
    artist: string
    rating: number
    numOfRatings: number
    releaseDate: string
}

const ArtistSongCard = (props: ArtistCardProps | SongCardProps) => {
    let subtitle = ''

    if (props.cardType === 'artist') {
        subtitle = props.alternateNames.length
            ? `AKA: ${props.alternateNames.join(', ')}`
            : props.title
    } else if (props.cardType === 'song') {
        subtitle = `by ${props.artist}`
    }

    return (
        <Link
            className='sm:p-5 p-2 gap-5 rounded-xl flex items-center bg-white text-blueGray cursor-pointer shadow hover:shadow-lg transition-all'
            to={props.cardType == 'song' ? '/song/123' : '/artist/123'}>
            <img
                className='aspect-square object-cover rounded-xl sm:w-32 sm:h-32 w-20 h-20'
                src={props.imageUrl}
                alt='Image'
                role='ArtistSongCard-image'
            />

            <div className='flex flex-col justify-between w-full max-w-full truncate sm:gap-5'>
                <div>
                    <div
                        className='sm:text-xl text-lg font-medium font-sans truncate'
                        role='ArtistSongCard-title'>
                        {props.title}
                    </div>
                    <div
                        className='sm:text-lg truncate sm:block hidden'
                        role='ArtistSongCard-subtitle'>
                        {subtitle}
                    </div>
                </div>
                <div className='flex sm:gap-x-5 gap-x-2 gap-y-0 max-[400px]:flex-col flex-wrap'>
                    {/* STARS */}
                    <RatingStars
                        rating={props.rating}
                        numOfRatings={props.numOfRatings}
                    />
                    {/* RELEASAE DATE */}
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
                </div>
            </div>
        </Link>
    )
}

export default ArtistSongCard

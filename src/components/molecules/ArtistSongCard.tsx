import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faStar as faStarFull,
    faCalendarDays
} from '@fortawesome/free-solid-svg-icons'
import {
    faStar as faStarEmpty,
    faStarHalfStroke as faStarHalf
} from '@fortawesome/free-regular-svg-icons'
import { formatDateString, formatNumberWithSuffix } from '../../lib/utils'

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
    const roundedRating = Math.round(props.rating * 2) / 2

    // Dynamically generate star icons based on the roundedRating
    const stars = Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(roundedRating)) {
            return faStarFull
        } else if (
            index === Math.floor(roundedRating) &&
            roundedRating % 1 !== 0
        ) {
            return faStarHalf
        } else {
            return faStarEmpty
        }
    })

    let subtitle = ''
    if (props.cardType === 'artist') {
        subtitle = props.alternateNames.length
            ? `AKA: ${props.alternateNames.join(', ')}`
            : props.title
    } else if (props.cardType === 'song') {
        subtitle = `by ${props.artist}`
    }

    return (
        <div className='sm:p-5 p-2 gap-5 rounded-xl flex items-center bg-white text-blueGray cursor-pointer shadow hover:shadow-lg transition-all'>
            <img
                className='aspect-square rounded-xl sm:w-32 sm:h-32 w-20 h-20 object-cover'
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
                    <div className='flex gap-1'>
                        <div className='truncate' role='ArtistSongCard-rating'>
                            {props.rating.toFixed(1)}
                        </div>
                        <div className='items-center sm:flex hidden'>
                            {stars.map((star, index) => (
                                <FontAwesomeIcon
                                    key={index}
                                    className='text-blueGray'
                                    icon={star}
                                />
                            ))}
                        </div>
                        <div className='sm:hidden'>
                            <FontAwesomeIcon
                                className='text-blueGray'
                                icon={faStarFull}
                            />
                        </div>
                        <div
                            className='truncate'
                            role='ArtistSongCard-numOfRatings'>
                            ({formatNumberWithSuffix(props.numOfRatings)})
                        </div>
                    </div>
                    {/* RELEASAE DATE */}
                    {props.cardType === 'song' && (
                        <div className='flex gap-1 items-center'>
                            <div
                                className='truncate'
                                role='ArtistSongCard-releaseDate'>
                                {formatDateString(props.releaseDate)}
                            </div>
                            <FontAwesomeIcon
                                className='text-blueGray'
                                icon={faCalendarDays}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArtistSongCard

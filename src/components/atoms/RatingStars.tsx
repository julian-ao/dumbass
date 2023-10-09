import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatNumberWithSuffix, getStarIcons } from '../../lib/utils'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'

export type ratingStarsProps = {
    rating: number
    numOfRatings?: number
    size?: 'small'
    color?: 'yellow'
}

const RatingStars = (props: ratingStarsProps) => {
    const stars = getStarIcons(props.rating)

    return (
        <div
            className={`flex gap-1 text-blueGray ${
                props.size == 'small' ? 'text-sm' : ''
            }`}>
            <div className='truncate' role='ArtistSongCard-rating'>
                {props.rating.toFixed(1)}
            </div>
            <div className='items-center sm:flex hidden'>
                {stars.map((star, index) => (
                    <FontAwesomeIcon
                        key={index}
                        className={
                            props.color == 'yellow'
                                ? 'text-yellow-500'
                                : 'text-blueGray'
                        }
                        icon={star}
                        size={props.size == 'small' ? 'xs' : 'sm'}
                    />
                ))}
            </div>
            <div className='sm:hidden'>
                <FontAwesomeIcon
                    className={
                        props.color == 'yellow'
                            ? 'text-yellow-500'
                            : 'text-blueGray'
                    }
                    icon={faStarFull}
                    size={props.size == 'small' ? 'xs' : 'sm'}
                />
            </div>
            {props.numOfRatings && (
                <div className='truncate' role='ArtistSongCard-numOfRatings'>
                    ({formatNumberWithSuffix(props.numOfRatings)})
                </div>
            )}
        </div>
    )
}

export default RatingStars

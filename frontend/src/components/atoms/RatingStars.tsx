import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatNumberWithSuffix, getStarIcons } from '../../lib/utils'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'

/**
 * @typedef {Object} RatingStarsProps
 *
 * @property {number} rating - The current rating to be displayed with stars.
 * @property {boolean} changeToOne - A boolean that determines if the rating should change to one star on narrow screens.
 * @property {number} [numOfRatings] - The number of given ratings.
 * @property {'small' | 'large'} [size='small'] - The size of the stars. Valid values include 'small' and 'large'.
 * @property {string} [color='yellow'] - The color of the stars, default value is 'yellow'.
 * @property {(newRating: number) => void} [updateRating] - A function that is called when a new star is selected.
 */
export type ratingStarsProps = {
    rating: number
    changeToOne: boolean
    numOfRatings?: number
    size?: 'small' | 'large'
    color?: 'yellow'
    updateRating?: (newRating: number) => void
}

/**
 * `RatingStars` is a component that displays a rating with stars.
 *
 * The rating can be displayed in different sizes and colors, and also has the capability to handle user interaction to update the rating.
 * If the `updateRating` prop is defined, the component will be interactive, allowing users to update the rating by clicking on the stars.
 *
 * @param {RatingStarsProps} props - Props passed to the RatingStars component.
 */
const RatingStars = (props: ratingStarsProps) => {
    const stars = getStarIcons(props.rating)

    return (
        <div
            className={`flex gap-1 text-blueGray ${
                props.size === 'small'
                    ? 'text-sm'
                    : props.size === 'large'
                    ? 'text-lg'
                    : 'text-md'
            }`}>
            {props.updateRating ? null : (
                <div className='truncate' role='ArtistSongCard-rating'>
                    {props.rating.toFixed(1)}
                </div>
            )}
            <div
                className={`items-center ${
                    props.changeToOne ? 'sm:flex hidden' : 'flex'
                }`}>
                {stars.map((star, index) => (
                    <FontAwesomeIcon
                        onClick={() =>
                            props.updateRating && props.updateRating(index + 1)
                        }
                        key={index}
                        className={`${
                            props.color === 'yellow'
                                ? 'text-yellow-500'
                                : 'text-blueGray'
                        } ${props.updateRating ? 'hover:cursor-pointer' : ''}`}
                        icon={star}
                        size={
                            props.size === 'small'
                                ? 'xs'
                                : props.size === 'large'
                                ? 'xl'
                                : '1x'
                        }
                    />
                ))}
            </div>
            <div className={`${props.changeToOne ? 'sm:hidden' : 'hidden'}`}>
                <FontAwesomeIcon
                    className={
                        props.color == 'yellow'
                            ? 'text-yellow-500'
                            : 'text-blueGray'
                    }
                    icon={faStarFull}
                    size={props.size == 'small' ? 'xs' : 'lg'}
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

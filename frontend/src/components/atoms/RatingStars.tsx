import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatNumberWithSuffix, getStarIcons } from '../../lib/utils'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'

/**
 * @typedef {Object} RatingStarsProps
 *
 * @property {number} rating - The current rating to be displayed with stars.
 * @property {boolean} changeToOne - Determines if the rating should change to one star on narrow screens for responsive design.
 * @property {number} [numOfRatings] - The number of given ratings, displayed next to the stars.
 * @property {'small' | 'large'} [size='small'] - The size of the stars, either 'small' or 'large'. Default is 'small'.
 * @property {string} [color='yellow'] - The color of the stars. Default is 'yellow'.
 * @property {(newRating: number) => void} [updateRating] - Function called when a new star is selected, enabling interactivity.
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
 * The component allows for different sizes and colors of the stars and can be interactive if the `updateRating` prop is provided.
 * When interactive, users can update the rating by clicking on the stars. The component is responsive, optionally changing to display
 * a single star on narrow screens based on the `changeToOne` prop. It also shows the number of ratings next to the stars.
 * Keyboard accessibility and ARIA roles are included for better user experience.
 *
 * @param {RatingStarsProps} props - Props passed to the RatingStars component.
 * @returns {JSX.Element} The rendered star rating component.
 */
const RatingStars = (props: ratingStarsProps) => {
    const stars = getStarIcons(props.rating)

    return (
        <main
            className={`flex gap-1 text-blueGray ${
                props.size === 'small'
                    ? 'text-sm'
                    : props.size === 'large'
                    ? 'text-lg'
                    : 'text-md'
            }`}>
            {props.updateRating ? null : (
                <div
                    className='cardRating truncate'
                    role='ArtistSongCard-rating'>
                    {props.rating.toFixed(1)}
                </div>
            )}
            <section
                className={`items-center ${
                    props.changeToOne ? 'sm:flex hidden' : 'flex'
                }`}>
                {stars.map((star, index) => (
                    <FontAwesomeIcon
                        id={
                            props.size === 'large'
                                ? `star-${index + 1}`
                                : undefined
                        }
                        tabIndex={props.updateRating ? 0 : -1}
                        onClick={() =>
                            props.updateRating && props.updateRating(index + 1)
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                props.updateRating &&
                                    props.updateRating(index + 1)
                                e.preventDefault()
                            }
                        }}
                        key={index}
                        className={`${
                            props.color === 'yellow'
                                ? 'text-yellow-500'
                                : 'text-blueGray'
                        } ${
                            props.updateRating
                                ? 'hover:cursor-pointer'
                                : 'outline-none'
                        }`}
                        icon={star}
                        data-testid='img'
                        size={
                            props.size === 'small'
                                ? 'xs'
                                : props.size === 'large'
                                ? 'xl'
                                : '1x'
                        }
                    />
                ))}
            </section>
            <section
                className={`${props.changeToOne ? 'sm:hidden' : 'hidden'}`}>
                <FontAwesomeIcon
                    className={
                        props.color == 'yellow'
                            ? 'text-yellow-500'
                            : 'text-blueGray'
                    }
                    icon={faStarFull}
                    data-testid='single-star-icon'
                    size={props.size == 'small' ? 'xs' : 'lg'}
                />
            </section>
            {props.numOfRatings && (
                <div
                    className='truncate'
                    data-testid='ArtistSongCard-numOfRatings'>
                    ({formatNumberWithSuffix(props.numOfRatings)})
                </div>
            )}
        </main>
    )
}

export default RatingStars

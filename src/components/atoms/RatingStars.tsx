import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatNumberWithSuffix, getStarIcons } from '../../lib/utils'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'

/**
 * @typedef {Object} RatingStarsProps
 * 
 * @property {number} rating - Den nåværende rangeringen som skal vises med stjerner.
 * @property {boolean} changeToOne - En boolean som avgjør om rangeringen skal endres til en stjerne på smale skjermer.
 * @property {number} [numOfRatings] - Antallet av givne rangeringer.
 * @property {'small' | 'large'} [size='small'] - Størrelsen på stjernene. Gyldige verdier inkluderer 'small' og 'large'.
 * @property {string} [color='yellow'] - Fargen på stjernene, standardverdien er 'yellow'.
 * @property {(newRating: number) => void} [updateRating] - En funksjon som blir kalt når en ny stjerne blir valgt. 
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
 * `RatingStars` er en komponent som viser en rangering med stjerner.
 * 
 * Rangeringen kan vises i forskjellige størrelser og farger, og har også muligheten for å håndtere brukerinteraksjon for å oppdatere rangeringen.
 * Dersom `updateRating` prop er definert, vil komponenten bli interaktiv, tillatende brukere å oppdatere rangeringen ved å klikke på stjernene.
 * 
 * @param {RatingStarsProps} props - Props som sendes inn til RatingStars-komponenten.
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

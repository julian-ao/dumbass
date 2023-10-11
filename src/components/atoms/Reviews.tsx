import InputField from '../../components/molecules/InputField'
import Button from '../../components/molecules/Button'
import { useState } from 'react'
import RatingStars from '../../components/atoms/RatingStars'
import toast from 'react-hot-toast'

/**
 * @typedef {Object} ReviewType
 *
 * @property {string} userName - Navnet på brukeren som har lagt igjen en anmeldelse.
 * @property {string} imageUrl - URL for bildet av brukeren.
 * @property {number} rating - Vurderingen som brukeren har gitt (antall stjerner).
 * @property {string} text - Selv anmeldelsesteksten.
 */

/**
 * @typedef {Object} ReviewProps
 *
 * @property {Array<ReviewType>} reviews - En array av review-objekter.
 */
type ReviewProps = {
    reviews: Array<{
        userName: string
        imageUrl: string
        rating: number
        text: string
    }>
}

/**
 * `Reviews` komponenten viser en liste av brukeranmeldelser og gir også et skjema for brukere å legge igjen sine egne anmeldelser.
 *
 * Den viser brukerbilder, navn, rangering og anmeldelsetekst for hver eksisterende anmeldelse. 
 * Hvis brukeren ikke har innsendt en anmeldelse, vises et skjema der de kan gi en stjernerangering og skrive en anmeldelsestekst.
 * Brukere kan bare sende inn én anmeldelse; etter innsending skjules skjemaet og en takkemelding vises.
 *
 * @param {ReviewProps} props - Props som sendes inn til `Reviews`-komponenten.
 */
const Reviews = ({ reviews }: ReviewProps) => {
    const [review, setReview] = useState('')
    const [userRating, setUserRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    const updateUserRating = (newRating: number) => {
        if (newRating === userRating) {
            setUserRating(0)
            return
        }
        setUserRating(newRating)
    }

    const submitReview = () => {
        if (userRating === 0) {
            toast.error('Must choose a rating', {
                style: {
                    padding: '14px',
                    color: '#696d7d'
                },
                iconTheme: {
                    primary: 'red',
                    secondary: '#FFFAEE'
                }
            })
            return
        }
        toast.success('Review submitted', {
            style: {
                padding: '14px',
                color: '#696d7d'
            },
            iconTheme: {
                primary: '#8fc0a9',
                secondary: '#FFFAEE'
            }
        })
        setUserRating(0)
        setReview('')
        setSubmitted(true)
    }

    return (
        <>
            {reviews.map((review, index) => (
                <div key={index}>
                    <div className='flex gap-3 items-center mb-2'>
                        <img
                            className='w-10 h-10 rounded-full aspect-square object-cover'
                            src={review.imageUrl}
                        />
                        <div className='flex flex-col'>
                            <div className='font-medium text-blueGray'>
                                {review.userName}
                            </div>
                            <RatingStars
                                rating={review.rating}
                                changeToOne={false}
                                size='small'
                                color='yellow'
                            />
                        </div>
                    </div>
                    <p className='text-blueGray'>{review.text}</p>
                </div>
            ))}
            <form
                className='flex-col gap-5 pt-5 border-t border-gray-200'
                /*onSubmit={() => ()}*/
            >
                {submitted ? (
                    <p className='text-blueGray italic'>
                        You have already submitted a review
                    </p>
                ) : (
                    <>
                        <div className='mb-4'>
                            <RatingStars
                                rating={userRating}
                                changeToOne={false}
                                size='large'
                                color='yellow'
                                updateRating={updateUserRating}
                            />
                        </div>
                        <div className='md:grid md:grid-cols-4 items-end gap-5'>
                            <InputField
                                id='yourReview'
                                type='text'
                                title='Your Review'
                                value={review}
                                onChange={setReview}
                                required
                                className='w-full md:col-span-3'
                            />
                            <div className='flex w-full justify-center mt-4'>
                                <Button
                                    title='Submit'
                                    type='button'
                                    onClick={submitReview}
                                    className='h-12'
                                />
                            </div>
                        </div>
                    </>
                )}
            </form>
        </>
    )
}

export default Reviews

import InputField from '../atoms/InputField'
import Button from '../atoms/Button'
import { useState } from 'react'
import RatingStars from '../atoms/RatingStars'
import { customToast } from '../../lib/utils'

/**
 * @typedef {Object} ReviewType
 *
 * @property {string} userName - The name of the user who has left a review.
 * @property {string} imageUrl - URL for the user's image.
 * @property {number} rating - The rating given by the user (number of stars).
 * @property {string} text - The review text itself.
 */

/**
 * @typedef {Object} ReviewProps
 *
 * @property {Array<ReviewType>} reviews - An array of review objects.
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
 * The `Reviews` component displays a list of user reviews and also provides a form for users to leave their own reviews.
 *
 * It displays user images, names, ratings, and review text for each existing review.
 * If the user has not submitted a review, a form is displayed where they can provide a star rating and write a review text.
 * Users can only submit one review; after submission, the form is hidden and a thank you message is displayed.
 *
 * @param {ReviewProps} props - Props passed to the `Reviews` component.
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
            customToast('error', 'You must choose a rating')
            return
        }
        customToast('success', 'Review submitted')
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

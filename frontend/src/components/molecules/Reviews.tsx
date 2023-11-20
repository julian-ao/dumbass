import React, { useState, useEffect } from 'react'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import InputField from '../atoms/InputField'
import Button from '../atoms/Button'
import RatingStars from '../atoms/RatingStars'
import useReviews from '../../hooks/useReviews'

/**
 * @typedef {Object} ReviewProps
 *
 * @property {string} targetId - The id of the song/artist that is to be reviewed.
 * @property {string} targetType - The type(song/artist) that is to be reviewd.
 */

/**
 * @typedef {Object} ReviewProps
 *
 * @property {Array<ReviewType>} reviews - An array of review objects.
 */
type ReviewProps = {
    targetId: string
    targetType: 'artist' | 'song'
}

interface Review {
    userName: string | null
    rating: number
    content: string
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
const Reviews = (props: ReviewProps) => {
    const userName = useSelector((state: RootState) => state.user.username)
    const userLoggedIn = useSelector((state: RootState) => state.user.loggedIn)
    const [emptyMessage, setEmptyMessage] = useState('')

    const {
        reviews,
        loading,
        error,
        review,
        userRating,
        submitted,
        setReview,
        setUserRating,
        submitReview
    } = useReviews(props.targetId, props.targetType)

    useEffect(() => {
        const emptyMessages = [
            'Be the first to share your thoughts about this!',
            'Looks like this place is waiting for your review!',
            "No reviews yet, but don't be shy to be the first!",
            'This page is like a blank canvas, waiting for your review to paint it!',
            'Join the conversation and leave a review!'
        ]

        const getRandomEmptyMessages = () => {
            const randomIndex = Math.floor(Math.random() * emptyMessages.length)
            return emptyMessages[randomIndex]
        }
        setEmptyMessage(getRandomEmptyMessages())
    }, [emptyMessage])

    const updateUserRating = (newRating: number) => {
        setUserRating(newRating === userRating ? 0 : newRating)
    }

    const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        submitReview()
    }

    return (
        <main>
            {error ? (
                <p className='text-blueGray italic'>
                    Something wrong happened. Please try again.
                </p>
            ) : (
                <>
                    <section>
                        {loading ? (
                            <>
                                {[...Array(2)].map((_, index) => (
                                    <div key={index} className='mb-7'>
                                        <div className='flex gap-3 items-center mb-2'>
                                            <Skeleton
                                                circle
                                                width={50}
                                                height={50}
                                            />
                                            <div className='flex flex-col'>
                                                <Skeleton width={150} />
                                                <Skeleton width={100} />
                                            </div>
                                        </div>
                                        <Skeleton count={3} width={'100%'} />
                                    </div>
                                ))}
                            </>
                        ) : reviews.length > 0 ? (
                            reviews.map((review: Review, index: number) => (
                                <div key={index} className='mb-7'>
                                    <div className='flex gap-3 items-center mb-2'>
                                        <img
                                            className='w-10 h-10 rounded-full aspect-square object-cover shadow'
                                            src={'/project2/avatar.png'}
                                            alt={`Avatar of ${review.userName}`}
                                        />
                                        <div className='flex flex-col'>
                                            <div className='font-medium text-blueGray'>
                                                {review.userName}{' '}
                                                {userName === review.userName &&
                                                    '(you)'}
                                            </div>
                                            <RatingStars
                                                rating={review.rating}
                                                changeToOne={false}
                                                size='small'
                                                color='yellow'
                                            />
                                        </div>
                                    </div>
                                    {review.content !== '' && (
                                        <p className='text-blueGray'>
                                            {review.content}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className='text-blueGray italic mb-5'>
                                {emptyMessage}
                            </p>
                        )}
                    </section>
                    {loading ? (
                        <section className='pt-5 border-t border-gray-200'>
                            <section className='flex-col gap-5'>
                                <Skeleton width={150} height={30} />
                                <br />
                                <Skeleton width={500} height={40} />
                            </section>
                        </section>
                    ) : (
                        <section className='pt-5 border-t border-gray-200'>
                            {userLoggedIn ? (
                                <form
                                    onSubmit={handleSubmitReview}
                                    className='flex-col gap-5 '>
                                    {submitted ? (
                                        <p className='text-blueGray italic'>
                                            You have already submitted a review
                                        </p>
                                    ) : (
                                        <section>
                                            <section className='mb-4'>
                                                <RatingStars
                                                    rating={userRating}
                                                    changeToOne={false}
                                                    size='large'
                                                    color='yellow'
                                                    updateRating={
                                                        updateUserRating
                                                    }
                                                />
                                            </section>
                                            <section className='md:grid md:grid-cols-4 items-end gap-5'>
                                                <InputField
                                                    id='yourReview'
                                                    type='text'
                                                    title='Your Review'
                                                    value={review}
                                                    onChange={setReview}
                                                    className='w-full md:col-span-3'
                                                />
                                                <section className='flex w-full justify-center mt-4'>
                                                    <Button
                                                        title='Submit'
                                                        type='submit'
                                                        className='h-12'
                                                    />
                                                </section>
                                            </section>
                                        </section>
                                    )}
                                </form>
                            ) : (
                                <p className='text-blueGray italic'>
                                    You need to be logged in to submit a review
                                </p>
                            )}
                        </section>
                    )}
                </>
            )}
        </main>
    )
}

export default Reviews

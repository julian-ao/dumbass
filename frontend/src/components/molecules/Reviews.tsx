import React, { useState, useEffect } from 'react'
import { RootState } from '../../redux/store'
import { GET_REVIEWS_BY_TARGET_ID } from '../../graphql/queries/reviewQueries'
import { ADD_REVIEW } from '../../graphql/mutations/reviewMutations'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import InputField from '../atoms/InputField'
import Button from '../atoms/Button'
import RatingStars from '../atoms/RatingStars'
import { customToast } from '../../lib/utils'
import { GET_ARTIST_BY_ID } from '../../graphql/queries/artistQueries'
import { GET_SONG_BY_ID } from '../../graphql/queries/songQueries'
import { GetReviewsByTargetIdQueryResult } from '../../lib/types'

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

    const [review, setReview] = useState('')
    const [userRating, setUserRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [emptyMessage, setEmptyMessage] = useState('')

    const { data, loading, error } = useQuery(GET_REVIEWS_BY_TARGET_ID, {
        variables: {
            targetType: props.targetType,
            targetId: parseInt(props.targetId)
        },
        fetchPolicy: 'cache-first'
    })

    const client = useApolloClient()

    const [addReview] = useMutation(ADD_REVIEW)

    useEffect(() => {
        if (data && data.getReviewsByTarget) {
            const hasSubmittedReview = data.getReviewsByTarget.some(
                (review: Review) => review.userName === userName
            )
            setSubmitted(hasSubmittedReview)
        }
    }, [data, userName])

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

    const getNewAverageRating = (
        newRating: number,
        oldAverageRating: number,
        numberOfRatings: number
    ) => {
        return (
            (oldAverageRating * numberOfRatings + newRating) /
            (numberOfRatings + 1)
        )
    }

    const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userRating === 0) {
            customToast('error', 'You must choose a rating')
            return
        }
        try {
            // Add new review to database
            const { data: addReviewData } = await addReview({
                variables: {
                    userName: userName,
                    rating: userRating,
                    content: review,
                    targetType: props.targetType,
                    targetId: parseInt(props.targetId)
                },
                // Inside your update function for addReview mutation
                update: (cache, { data: { addReview: newReview } }) => {
                    if (newReview) {
                        // Get existing reviews from cache
                        const existingReviewsData =
                            cache.readQuery<GetReviewsByTargetIdQueryResult>({
                                query: GET_REVIEWS_BY_TARGET_ID,
                                variables: {
                                    targetType: props.targetType,
                                    targetId: parseInt(props.targetId)
                                }
                            })

                        // If no existing reviews, initialize with empty array
                        const existingReviews =
                            existingReviewsData?.getReviewsByTarget || []

                        // Construct updated reviews with the new review
                        const updatedReviews = {
                            getReviewsByTarget: [...existingReviews, newReview]
                        }

                        // Write the updated reviews back to the cache
                        cache.writeQuery({
                            query: GET_REVIEWS_BY_TARGET_ID,
                            variables: {
                                targetType: props.targetType,
                                targetId: parseInt(props.targetId)
                            },
                            data: updatedReviews
                        })
                    }
                }
            })

            // Update the number of ratings and average rating for the info page using cache
            if (addReviewData?.addReview) {
                if (props.targetType === 'artist') {
                    // Get the artistData from cache
                    const artistData = client.readQuery({
                        query: GET_ARTIST_BY_ID,
                        variables: { id: parseInt(props.targetId) }
                    })
                    // Rewrite the artistData with the new review to the cache
                    client.writeQuery({
                        query: GET_ARTIST_BY_ID,
                        variables: { id: parseInt(props.targetId) },
                        data: {
                            getArtistById: {
                                ...artistData.getArtistById,
                                number_of_ratings:
                                    artistData.getArtistById.number_of_ratings +
                                    1,
                                average_rating: getNewAverageRating(
                                    userRating,
                                    artistData.getArtistById.average_rating,
                                    artistData.getArtistById.number_of_ratings
                                )
                            }
                        }
                    })
                } else if (props.targetType === 'song') {
                    // Get the songData from cache
                    const songData = client.readQuery({
                        query: GET_SONG_BY_ID,
                        variables: { id: parseInt(props.targetId) }
                    })
                    // Rewrite the songData with the new review to the cache
                    client.writeQuery({
                        query: GET_SONG_BY_ID,
                        variables: { id: parseInt(props.targetId) },
                        data: {
                            getSongById: {
                                ...songData.getSongById,
                                number_of_ratings:
                                    songData.getSongById.number_of_ratings + 1,
                                average_rating: getNewAverageRating(
                                    userRating,
                                    songData.getSongById.average_rating,
                                    songData.getSongById.number_of_ratings
                                )
                            }
                        }
                    })
                }
            } else {
                throw new Error()
            }

            if (addReviewData?.addReview) {
                customToast('success', 'Review submitted')
                setSubmitted(true)
            } else {
                throw new Error()
            }
        } catch (error) {
            customToast('error', 'Something went wrong. Please try again.')
        }
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
                        ) : data?.getReviewsByTarget.length > 0 ? (
                            data?.getReviewsByTarget?.map(
                                (review: Review, index: number) => (
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
                                                    {userName ===
                                                        review.userName &&
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
                                )
                            )
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
                                                        id='submitReview'
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

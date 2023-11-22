import { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'
import { GET_REVIEWS_BY_TARGET_ID } from '../graphql/queries/reviewQueries'
import { ADD_REVIEW } from '../graphql/mutations/reviewMutations'
import { customToast, getNewAverageRating } from '../lib/utils'
import { RootState } from '../redux/store'
import { GetReviewsByTargetIdQueryResult } from '../lib/types'
import { GET_SONG_BY_ID } from '../graphql/queries/songQueries'
import { GET_ARTIST_BY_ID } from '../graphql/queries/artistQueries'

type Review = {
    userName: string | null
    rating: number
    content: string
}

/**
 * Custom hook: `useReviews`.
 *
 * This hook is used to manage reviews for a specific target (either a song or an artist).
 * It handles fetching existing reviews, submitting new reviews, and updating the Apollo Client cache with the new data.
 *
 * @param {string} targetId - The unique identifier of the target (song or artist) for which reviews are being managed.
 * @param {'artist' | 'song'} targetType - The type of the target ('artist' or 'song').
 * @returns {Object} An object containing:
 *                   - `reviews`: An array of existing reviews for the target.
 *                   - `loading`: A boolean indicating if the review fetching query is still loading.
 *                   - `error`: An error object for the review fetching query.
 *                   - `review`: The current state value of the review content being submitted.
 *                   - `userRating`: The current state value of the user's rating being submitted.
 *                   - `submitted`: A boolean indicating if the user has already submitted a review.
 *                   - `setReview`: A function to update the review content state.
 *                   - `setUserRating`: A function to update the user rating state.
 *                   - `submitReview`: A function to submit the new review.
 */
const useReviews = (targetId: string, targetType: 'artist' | 'song') => {
    const [review, setReview] = useState('')
    const [userRating, setUserRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const userName = useSelector((state: RootState) => state.user.username)
    const client = useApolloClient()

    const { data, loading, error } = useQuery(GET_REVIEWS_BY_TARGET_ID, {
        variables: {
            targetType: targetType,
            targetId: parseInt(targetId)
        },
        fetchPolicy: 'cache-first'
    })

    const [addReviewMutation] = useMutation(ADD_REVIEW)

    useEffect(() => {
        if (data && data.getReviewsByTarget) {
            const hasSubmittedReview = data.getReviewsByTarget.some(
                (review: Review) => review.userName === userName
            )
            setSubmitted(hasSubmittedReview)
        }
    }, [data, userName])

    const submitReview = async () => {
        if (userRating === 0) {
            customToast('error', 'You must choose a rating')
            return
        }

        try {
            const response = await addReviewMutation({
                variables: {
                    userName: userName,
                    rating: userRating,
                    content: review,
                    targetType: targetType,
                    targetId: parseInt(targetId)
                },
                update: (cache, { data: { addReview: newReview } }) => {
                    if (newReview) {
                        // Get existing reviews from cache
                        const existingReviewsData =
                            cache.readQuery<GetReviewsByTargetIdQueryResult>({
                                query: GET_REVIEWS_BY_TARGET_ID,
                                variables: {
                                    targetType: targetType,
                                    targetId: parseInt(targetId)
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
                                targetType: targetType,
                                targetId: parseInt(targetId)
                            },
                            data: updatedReviews
                        })
                    }
                }
            })

            if (response.data.addReview) {
                if (targetType === 'artist') {
                    // Get the artistData from cache
                    const artistData = client.readQuery({
                        query: GET_ARTIST_BY_ID,
                        variables: { id: parseInt(targetId) }
                    })
                    // Rewrite the artistData with the new review to the cache
                    client.writeQuery({
                        query: GET_ARTIST_BY_ID,
                        variables: { id: parseInt(targetId) },
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
                } else if (targetType === 'song') {
                    // Get the songData from cache
                    const songData = client.readQuery({
                        query: GET_SONG_BY_ID,
                        variables: { id: parseInt(targetId) }
                    })
                    // Rewrite the songData with the new review to the cache
                    client.writeQuery({
                        query: GET_SONG_BY_ID,
                        variables: { id: parseInt(targetId) },
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
            }

            if (response.data.addReview) {
                customToast('success', 'Review submitted')
                setSubmitted(true)
            } else {
                throw new Error()
            }
        } catch (error) {
            customToast('error', 'Something went wrong. Please try again.')
        }
    }

    return {
        reviews: data ? data.getReviewsByTarget : [],
        loading,
        error,
        review,
        userRating,
        submitted,
        setReview,
        setUserRating,
        submitReview
    }
}

export default useReviews

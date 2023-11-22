import { gql } from '@apollo/client'

/**
 * GraphQL query: GET_REVIEWS_BY_TARGET_ID.
 *
 * This query fetches reviews for a specific target item, identified by its type and ID.
 * The target can be either a song or an artist. The query returns a list of reviews, 
 * each containing the username of the reviewer, the content of the review, and the rating given.
 *
 * @param {string} $targetType - The type of the target for which reviews are being fetched ('song' or 'artist').
 * @param {number} $targetId - The unique identifier of the target (song or artist).
 * @returns {Array<Object>} An array of review objects, each containing the userName, content, and rating of the review.
 */
export const GET_REVIEWS_BY_TARGET_ID = gql`
    query ($targetType: String!, $targetId: Int!) {
        getReviewsByTarget(targetType: $targetType, targetId: $targetId) {
            userName
            content
            rating
        }
    }
`

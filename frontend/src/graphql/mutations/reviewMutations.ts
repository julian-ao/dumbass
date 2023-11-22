import { gql } from '@apollo/client'

/**
 * GraphQL mutation: ADD_REVIEW.
 *
 * This mutation is used to add a new review to a song or artist in the database.
 * It takes the username, review content, rating, target type (song or artist), and target ID as parameters.
 *
 * The mutation returns the details of the newly added review, including the username, review content, rating, target type, and target ID.
 *
 * @param {string} $userName - The name of the user adding the review.
 * @param {string} [$content] - The content of the review.
 * @param {number} $rating - The rating given by the user.
 * @param {string} $targetType - The type of the target being reviewed (either 'song' or 'artist').
 * @param {number} $targetId - The unique identifier of the target (song or artist).
 * @returns {Object} The review object containing userName, content, rating, targetType, and targetId.
 */
export const ADD_REVIEW = gql`
    mutation (
        $userName: String!
        $content: String
        $rating: Int!
        $targetType: String!
        $targetId: Int!
    ) {
        addReview(
            userName: $userName
            content: $content
            rating: $rating
            targetType: $targetType
            targetId: $targetId
        ) {
            userName
            content
            rating
            targetType
            targetId
        }
    }
`

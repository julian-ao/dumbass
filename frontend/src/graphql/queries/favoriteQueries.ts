import { gql } from '@apollo/client'

/**
 * GraphQL query: CHECK_IF_FAVORITE.
 *
 * This query checks if a specific item (song or artist) is marked as a favorite by a user.
 * It requires the username of the user, the type of the item (song or artist), and the item's ID.
 *
 * @param {string} $username - The username of the user.
 * @param {string} $type - The type of the item ('song' or 'artist').
 * @param {number} $targetId - The ID of the item (song or artist).
 * @returns {boolean} A boolean indicating whether the item is a favorite of the user.
 */
export const CHECK_IF_FAVORITE = gql`
    query ($username: String!, $type: String!, $targetId: Int!) {
        checkIfFavorite(username: $username, type: $type, targetId: $targetId)
    }
`

/**
 * GraphQL query: GET_FAVORITES.
 *
 * This query retrieves a list of favorite items (songs or artists) for a specific user.
 * It requires the username of the user and returns an array of objects, each representing a favorite item.
 * Each object includes the type of the item (song or artist) and its ID.
 *
 * @param {string} $username - The username of the user whose favorites are being requested.
 * @returns {Array<Object>} An array of objects, each containing the type ('song' or 'artist') and the targetId of the favorite item.
 */
export const GET_FAVORITES = gql`
    query ($username: String!) {
        getFavorites(username: $username) {
            type
            targetId
        }
    }
`

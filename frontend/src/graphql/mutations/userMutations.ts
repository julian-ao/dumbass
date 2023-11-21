import { gql } from '@apollo/client'

/**
 * GraphQL mutation: ADD_USER.
 *
 * This mutation is used to add a new user to the system.
 * It requires a username and password for the new user.
 *
 * @param {string} $username - The username for the new user.
 * @param {string} $password - The password for the new user.
 * @returns {Object} An object containing the username of the newly created user.
 */

export const ADD_USER = gql`
    mutation ($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            username
        }
    }
`

/**
 * GraphQL mutation: LOGIN_USER.
 *
 * This mutation is used for user authentication.
 * It takes a username and password and returns user details upon successful authentication.
 *
 * @param {string} $username - The username of the user trying to log in.
 * @param {string} $password - The password of the user trying to log in.
 * @returns {Object} An object containing the username of the authenticated user.
 */
export const LOGIN_USER = gql`
    mutation ($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            username
        }
    }
`


/**
 * GraphQL mutation: ADD_FAVORITE.
 *
 * This mutation adds a favorite item (song or artist) to a user's profile.
 * It requires the username of the user, the type of the favorite item (song or artist), and the item's ID.
 *
 * @param {string} $username - The username of the user adding the favorite.
 * @param {string} $type - The type of the favorite item ('song' or 'artist').
 * @param {number} $targetId - The ID of the favorite item.
 * @returns {Object} An object containing the username of the user.
 */
export const ADD_FAVORITE = gql`
    mutation ($username: String!, $type: String!, $targetId: Int!) {
        addFavorite(username: $username, type: $type, targetId: $targetId) {
            username
        }
    }
`
/**
 * GraphQL mutation: REMOVE_FAVORITE.
 *
 * This mutation removes a favorite item (song or artist) from a user's profile.
 * It requires the username of the user, the type of the favorite item (song or artist), and the item's ID.
 *
 * @param {string} $username - The username of the user removing the favorite.
 * @param {string} $type - The type of the favorite item ('song' or 'artist').
 * @param {number} $targetId - The ID of the favorite item.
 * @returns {Object} An object containing the username of the user.
 */
export const REMOVE_FAVORITE = gql`
    mutation ($username: String!, $type: String!, $targetId: Int!) {
        removeFavorite(username: $username, type: $type, targetId: $targetId) {
            username
        }
    }
`

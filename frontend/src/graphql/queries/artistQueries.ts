import { gql } from '@apollo/client'

/**
 * GraphQL query: GET_ARTIST_BY_ID.
 *
 * This query fetches detailed information about an artist by their unique ID.
 * The details include alternate names, description, image URL, name, average rating, and the number of ratings.
 *
 * @param {string} $id - The unique ID of the artist to fetch.
 * @returns {Object} An object containing detailed information about the artist.
 */
export const GET_ARTIST_BY_ID = gql`
    query ($id: ID!) {
        getArtistById(id: $id) {
            alternate_names
            description
            image_url
            name
            average_rating
            number_of_ratings
        }
    }
`

/**
 * GraphQL query: GET_ARTISTS_BY_ID.
 *
 * This query retrieves detailed information for a list of artists based on their unique IDs.
 * The details include the artist's ID, name, alternate names, description, image URL, average rating, and the number of ratings.
 *
 * @param {Array<number>} $ids - An array of IDs of the artists to fetch.
 * @returns {Array<Object>} An array of objects, each containing detailed information about an artist.
 */
export const GET_ARTISTS_BY_ID = gql`
    query ($ids: [Int]!) {
        getArtistsByIds(ids: $ids) {
            id
            name
            alternate_names
            description
            image_url
            average_rating
            number_of_ratings
        }
    }
`

/**
 * GraphQL query: GET_ARTISTS_ON_NAME.
 *
 * This query fetches a list of artists based on a search term, with optional parameters for pagination and sorting.
 * The details returned for each artist include ID, name, alternate names, image URL, average rating, and the number of ratings.
 *
 * @param {string} [$name] - The name or part of the name of the artists to search for.
 * @param {number} [$limit] - The maximum number of artists to return.
 * @param {string} [$sort] - The sorting criteria (e.g., 'rating', 'alphabetical').
 * @param {number} [$page] - The page number for pagination.
 * @returns {Array<Object>} An array of objects, each containing information about an artist.
 */
export const GET_ARTISTS_ON_NAME = gql`
    query ($name: String, $limit: Int, $sort: String, $page: Int) {
        getArtistsOnName(name: $name, limit: $limit, sort: $sort, page: $page) {
            id
            name
            alternate_names
            image_url
            average_rating
            number_of_ratings
        }
    }
`

/**
 * GraphQL query: COUNT_ARTISTS.
 *
 * This query counts the number of artists in the database that match a given name or search term.
 *
 * @param {string} [$name] - The name or part of the name of the artists to count.
 * @returns {number} The count of artists matching the search criteria.
 */
export const COUNT_ARTISTS = gql`
    query ($name: String) {
        countArtists(name: $name)
    }
`

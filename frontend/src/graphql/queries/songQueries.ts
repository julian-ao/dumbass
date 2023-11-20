import { gql } from '@apollo/client'

/**
 * GraphQL query: GET_SONG_BY_ID.
 *
 * This query fetches detailed information about a song by its unique ID. 
 * The details include the song's lyrics, header image URL, release date, title, artist names, average rating, and the number of ratings.
 *
 * @param {string} $id - The unique ID of the song to fetch.
 * @returns {Object} An object containing detailed information about the song.
 */
export const GET_SONG_BY_ID = gql`
    query ($id: ID!) {
        getSongById(id: $id) {
            lyrics
            header_image_url
            release_date
            title
            artist_names
            average_rating
            number_of_ratings
        }
    }
`

/**
 * GraphQL query: GET_SONGS_BY_ID.
 *
 * This query retrieves detailed information for a list of songs based on their unique IDs.
 * The details include the song's ID, title, artist names, header image URL, release date, primary artist ID, average rating, and number of ratings.
 *
 * @param {Array<number>} $ids - An array of IDs of the songs to fetch.
 * @returns {Array<Object>} An array of objects, each containing detailed information about a song.
 */
export const GET_SONGS_BY_ID = gql`
    query ($ids: [Int]!) {
        getSongsByIds(ids: $ids) {
            id
            title
            artist_names
            header_image_url
            release_date
            primary_artist_id
            average_rating
            number_of_ratings
        }
    }
`

/**
 * GraphQL query: GET_SONGS_ON_TITLE.
 *
 * This query fetches a list of songs based on a search term, with optional parameters for pagination and sorting.
 * The details returned for each song include the header image URL, ID, title, artist names, average rating, number of ratings, and release date.
 *
 * @param {string} [$title] - The title or part of the title of the songs to search for.
 * @param {number} [$limit] - The maximum number of songs to return.
 * @param {string} [$sort] - The sorting criteria (e.g., 'rating', 'alphabetical').
 * @param {number} [$page] - The page number for pagination.
 * @returns {Array<Object>} An array of objects, each containing information about a song.
 */
export const GET_SONGS_ON_TITLE = gql`
    query ($title: String, $limit: Int, $sort: String, $page: Int) {
        getSongsOnTitle(
            title: $title
            limit: $limit
            sort: $sort
            page: $page
        ) {
            header_image_url
            id
            title
            artist_names
            average_rating
            number_of_ratings
            release_date
        }
    }
`

/**
 * GraphQL query: COUNT_SONGS.
 *
 * This query counts the number of songs in the database that match a given title or search term.
 *
 * @param {string} [$title] - The title or part of the title of the songs to count.
 * @returns {number} The count of songs matching the search criteria.
 */
export const COUNT_SONGS = gql`
    query ($title: String) {
        countSongs(title: $title)
    }
`

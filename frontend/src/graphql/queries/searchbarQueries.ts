import { gql } from '@apollo/client'

/**
 * GraphQL query: SEARCHBAR_DROPDOWN.
 *
 * This query is used to provide the searchbar with relevant data in the dropdown. 
 * It searches for either artists or songs based on the given search type and search string.
 * The query supports pagination by accepting a limit parameter, which specifies the maximum number of results to return.
 *
 * The results are polymorphic: they can be either artists or songs, depending on the search type.
 * For artists, the query returns their name and ID. For songs, it returns the title and ID.
 *
 * @param {string} $searchType - The type of search ('artist' or 'song').
 * @param {string} $searchString - The search string or term entered by the user.
 * @param {number} [$limit] - Optional. The maximum number of results to return.
 * @returns {Array<Object>} An array of search results, each being either an artist or a song, with their respective details.
 */
export const SEARCHBAR_DROPDOWN = gql`
    query ($searchType: String!, $searchString: String!, $limit: Int) {
        searchSearchbar(
            searchType: $searchType
            searchString: $searchString
            limit: $limit
        ) {
            ... on Artist {
                name
                id
            }
            ... on Song {
                title
                id
            }
        }
    }
`

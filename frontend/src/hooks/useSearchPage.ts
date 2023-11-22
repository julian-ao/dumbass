import { useQuery } from '@apollo/client'
import {
    COUNT_ARTISTS,
    GET_ARTISTS_ON_NAME
} from '../graphql/queries/artistQueries'
import { COUNT_SONGS, GET_SONGS_ON_TITLE } from '../graphql/queries/songQueries'

/**
 * Custom hook: `useSearchPage`.
 *
 * This hook facilitates the search functionality on the search page of the application.
 * It handles the querying of songs or artists based on the provided search term, filter, sorting option, 
 * and pagination details. It uses Apollo Client's `useQuery` to fetch both the total count and the paginated list 
 * of songs or artists that match the search criteria.
 *
 * @param {string | null} term - The search term used to query songs or artists.
 * @param {string | null} filter - The filter applied to the search (e.g., 'song' or 'artist').
 * @param {string | null} sort - The sorting criteria (e.g., 'rating', 'alphabetical').
 * @param {number} itemsPerPage - The number of items to display per page.
 * @param {number} currentPage - The current page number in the pagination.
 * @returns {Object} An object containing:
 *                   - `totalSongsData`: The total count of songs that match the search term.
 *                   - `totalArtistsData`: The total count of artists that match the search term.
 *                   - `artistsData`: The paginated list of artists that match the search term.
 *                   - `songsData`: The paginated list of songs that match the search term.
 *                   - `loading`: A boolean indicating if either the songs or artists query is still loading.
 */
export const useSearchPage = (
    term: string | null,
    filter: string | null,
    sort: string | null,
    itemsPerPage: number,
    currentPage: number
) => {
    const { data: totalSongsData } = useQuery(COUNT_SONGS, {
        variables: { title: term },
        skip: filter !== 'song'
    })

    const { data: totalArtistsData } = useQuery(COUNT_ARTISTS, {
        variables: { name: term },
        skip: filter !== 'artist'
    })

    const { data: artistsData, loading: artistsLoading } = useQuery(
        GET_ARTISTS_ON_NAME,
        {
            variables: {
                name: term,
                limit: itemsPerPage,
                sort: sort,
                page: currentPage
            },
            skip: filter !== 'artist',
            fetchPolicy: 'cache-and-network'
        }
    )

    const { data: songsData, loading: songsLoading } = useQuery(
        GET_SONGS_ON_TITLE,
        {
            variables: {
                title: term,
                limit: itemsPerPage,
                sort: sort,
                page: currentPage
            },
            skip: filter !== 'song',
            fetchPolicy: 'cache-and-network'
        }
    )

    return {
        totalSongsData,
        totalArtistsData,
        artistsData,
        songsData,
        loading: songsLoading || artistsLoading
    }
}

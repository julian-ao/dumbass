import { useQuery } from '@apollo/client'
import {
    COUNT_ARTISTS,
    GET_ARTISTS_ON_NAME
} from '../graphql/queries/artistQueries'
import { COUNT_SONGS, GET_SONGS_ON_TITLE } from '../graphql/queries/songQueries'

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

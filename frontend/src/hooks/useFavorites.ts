import { useQuery } from '@apollo/client'
import { GET_FAVORITES } from '../graphql/queries/favoriteQueries'
import { GET_SONGS_BY_ID } from '../graphql/queries/songQueries'
import { useEffect, useState } from 'react'
import { GET_ARTISTS_BY_ID } from '../graphql/queries/artistQueries'

type Favorite = {
    type: string
    targetId: number
}

export const useFavorites = (username: string | null) => {
    const [songFavorites, setSongFavorites] = useState<number[]>([])
    const [artistFavorites, setArtistFavorites] = useState<number[]>([])

    const {
        data: dataFavorites,
        loading: loadingFavorites,
        error: errorFavorites
    } = useQuery(GET_FAVORITES, {
        variables: { username },
        skip: !username // This skips the query if username is falsy,
    })

    useEffect(() => {
        if (dataFavorites && dataFavorites.getFavorites) {
            const songs = dataFavorites.getFavorites
                .filter((item: Favorite) => item.type === 'song')
                .map((item: Favorite) => item.targetId)
            setSongFavorites(songs)

            const artists = dataFavorites.getFavorites
                .filter((item: Favorite) => item.type === 'artist')
                .map((item: Favorite) => item.targetId)
            setArtistFavorites(artists)
        }
    }, [dataFavorites])

    const {
        data: dataSongs,
        loading: loadingSongs,
        error: errorSongs
    } = useQuery(GET_SONGS_BY_ID, {
        variables: { ids: songFavorites },
        skip: songFavorites.length === 0
    })

    const {
        data: dataArtists,
        loading: loadingArtists,
        error: errorArtists
    } = useQuery(GET_ARTISTS_BY_ID, {
        variables: { ids: artistFavorites },
        skip: artistFavorites.length === 0
    })

    return {
        dataSongs,
        dataArtists,
        loading: loadingSongs || loadingArtists || loadingFavorites,
        error: errorSongs || errorArtists || errorFavorites
    }
}

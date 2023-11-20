import { useMutation, useQuery } from '@apollo/client'
import {
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from '../graphql/mutations/userMutations'
import {
    CHECK_IF_FAVORITE,
    GET_FAVORITES
} from '../graphql/queries/favoriteQueries'
import { FavoriteType, GetFavoritesDataQueryResult } from '../lib/types'

const useFavorite = (type: string, id: string, username: string | null) => {
    const [addFavoriteMutation] = useMutation(ADD_FAVORITE, {
        variables: {
            username: username,
            type: type,
            targetId: Number(id)
        },
        update: (cache) => {
            const existingFavoriteData =
                cache.readQuery<GetFavoritesDataQueryResult>({
                    query: GET_FAVORITES,
                    variables: { username: username }
                })

            if (existingFavoriteData !== null) {
                const existingData: FavoriteType[] =
                    existingFavoriteData?.getFavorites || []

                const updatedFavorites: GetFavoritesDataQueryResult = {
                    getFavorites: [
                        ...existingData,
                        { targetId: Number(id), type: type }
                    ]
                }

                cache.writeQuery<GetFavoritesDataQueryResult>({
                    query: GET_FAVORITES,
                    variables: { username: username },
                    data: updatedFavorites
                })
            }
            cache.writeQuery({
                query: CHECK_IF_FAVORITE,
                variables: {
                    username,
                    type: type,
                    targetId: Number(id)
                },
                data: { checkIfFavorite: true }
            })
        }
    })

    const [removeFavoriteMutation] = useMutation(REMOVE_FAVORITE, {
        variables: {
            username: username,
            type: type,
            targetId: Number(id)
        },
        update: (cache) => {
            const existingFavoriteData =
                cache.readQuery<GetFavoritesDataQueryResult>({
                    query: GET_FAVORITES,
                    variables: { username: username }
                })

            if (existingFavoriteData !== null) {
                const existingData: FavoriteType[] =
                    existingFavoriteData?.getFavorites || []

                const updatedFavorites: GetFavoritesDataQueryResult = {
                    getFavorites:
                        existingData.filter(
                            (favorite) =>
                                favorite.type !== type ||
                                favorite.targetId !== Number(id)
                        ) || []
                }

                cache.writeQuery<GetFavoritesDataQueryResult>({
                    query: GET_FAVORITES,
                    variables: { username: username },
                    data: updatedFavorites
                })
            }
            cache.writeQuery({
                query: CHECK_IF_FAVORITE,
                variables: {
                    username,
                    type: type,
                    targetId: Number(id)
                },
                data: { checkIfFavorite: false }
            })
        }
    })

    const { data: checkIfFavoriteData, error } = useQuery(CHECK_IF_FAVORITE, {
        variables: {
            username,
            type: type,
            targetId: Number(id)
        }
    })

    return {
        addFavoriteMutation,
        removeFavoriteMutation,
        checkIfFavoriteData,
        error
    }
}

export default useFavorite

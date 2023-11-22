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

/**
 * Custom hook: `useFavorite`.
 *
 * This hook provides the functionality to add or remove a favorite item (either a song or artist) and to check if an item is a favorite for a specific user.
 * It uses Apollo Client's `useMutation` and `useQuery` hooks to interact with GraphQL mutations and queries.
 *
 * @param {string} type - The type of the item (either 'song' or 'artist').
 * @param {string} id - The unique identifier of the item.
 * @param {string | null} username - The username of the user for whom the favorite status is being managed.
 * @returns {Object} An object containing functions and data for managing favorite items:
 *                   - `addFavoriteMutation`: Function to add an item to the user's favorites.
 *                   - `removeFavoriteMutation`: Function to remove an item from the user's favorites.
 *                   - `checkIfFavoriteData`: Data returned from the `CHECK_IF_FAVORITE` query, indicating if the item is a favorite.
 *                   - `error`: Error object from the `CHECK_IF_FAVORITE` query.
 */
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

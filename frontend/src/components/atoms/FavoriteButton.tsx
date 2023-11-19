import {
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from '../../graphql/mutations/userMutations'
import {
    GET_FAVORITES,
    CHECK_IF_FAVORITE
} from '../../graphql/queries/favoriteQueries'
import { customToast } from '../../lib/utils'
import { useQuery, useMutation } from '@apollo/client'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { GetFavoritesDataQueryResult, FavoriteType } from '../../lib/types'
import { useEffect, useState } from 'react'

type FavoriteButtonProps = {
    type: string
    id: string
}

export const FavoriteButton = (props: FavoriteButtonProps) => {
    const username = useSelector((state: RootState) => state.user.username)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [isCheckingFavorite, setIsCheckingFavorite] = useState(false)

    const [addFavorite] = useMutation(ADD_FAVORITE, {
        variables: {
            name: username,
            type: props.type,
            targetId: Number(props.id)
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
                        { targetId: Number(props.id), type: props.type }
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
                    type: props.type,
                    targetId: Number(props.id)
                },
                data: { checkIfFavorite: true }
            })
        }
    })

    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        variables: {
            name: username,
            type: props.type,
            targetId: Number(props.id)
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
                                favorite.type !== props.type ||
                                favorite.targetId !== Number(props.id)
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
                    type: props.type,
                    targetId: Number(props.id)
                },
                data: { checkIfFavorite: false }
            })
        }
    })

    const { data: checkIfFavoriteData, error } = useQuery(CHECK_IF_FAVORITE, {
        variables: {
            username,
            type: props.type,
            targetId: Number(props.id)
        },
        fetchPolicy: 'cache-first'
    })

    if (error) {
        customToast('error', 'Failed to check if favorite')
    }

    useEffect(() => {
        if (checkIfFavoriteData && checkIfFavoriteData.checkIfFavorite) {
            setIsFavorite(checkIfFavoriteData.checkIfFavorite)
        }
    }, [checkIfFavoriteData])

    useEffect(() => {
        if (!username) {
            setIsFavorite(false)
        }
    }, [username])

    const handleFavoriteButtonClick = async () => {
        if (!username) {
            customToast('error', 'You need to login to add to favorites')
            return
        }
        try {
            setIsCheckingFavorite(true)
            if (!isFavorite) {
                const { data } = await addFavorite({
                    variables: {
                        username: username,
                        type: props.type,
                        targetId: Number(props.id)
                    }
                })
                if (data && data.addFavorite) {
                    customToast('emoji', 'Added to favorites', '💖')
                    setIsFavorite(true)
                }
            } else if (isFavorite) {
                const { data } = await removeFavorite({
                    variables: {
                        username: username,
                        type: props.type,
                        targetId: Number(props.id)
                    }
                })
                if (data && data.removeFavorite) {
                    customToast('emoji', 'Removed from favorites', '💔')
                    setIsFavorite(false)
                }
            }
        } catch (error) {
            customToast('error', 'Something went wrong, please try again')
            console.error(error)
        } finally {
            setIsCheckingFavorite(false)
        }
    }

    return (
        <button
            type='button'
            onClick={() => {
                handleFavoriteButtonClick()
            }}
            className={`hover:shadow transition-all px-3 font-medium rounded-lg text-xs py-2 mr-2 mt-2 xs:mt-0 xs:mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border ${
                isFavorite
                    ? 'text-gray-900 border-gray-200'
                    : 'text-white bg-green border-green'
            }`}
            disabled={isCheckingFavorite}>
            {isFavorite ? 'Remove favorite' : 'Favorite'}
        </button>
    )
}

import {
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from '../../graphql/mutations/userMutations'
import {
    GET_FAVORITES,
    CHECK_IF_FAVORITE
} from '../../graphql/queries/favoriteQueries'
import { customToast } from '../../lib/utils'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { GetFavoritesDataQueryResult } from '../../lib/types'
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
        variables: { name: username, type: props.type, targetId: props.id },
        update: (cache, { data: { addFavorite } }) => {
            // Read the existing data from the cache
            const existingFavoriteData =
                cache.readQuery<GetFavoritesDataQueryResult>({
                    query: GET_FAVORITES,
                    variables: { username: username }
                })

            const existingData = existingFavoriteData?.getFavorites || []
            const updatedData = { getFavorites: [...existingData, addFavorite] }
            cache.writeQuery<GetFavoritesDataQueryResult>({
                query: GET_FAVORITES,
                variables: { username: username },
                data: updatedData
            })
        }
    })

    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        variables: { name: username, type: props.type, targetId: props.id },
        update: (cache) => {
            // Read the existing data from the cache
            const existingFavoriteData =
                cache.readQuery<GetFavoritesDataQueryResult>({
                    query: GET_FAVORITES,
                    variables: { username: username }
                })
            const existingData = existingFavoriteData?.getFavorites || []
            const updatedFavorites = {
                getFavorites: existingData.filter(
                    (favorite) =>
                        favorite.type !== props.type ||
                        favorite.targetId !== parseInt(props.id)
                )
            }
            cache.writeQuery<GetFavoritesDataQueryResult>({
                query: GET_FAVORITES,
                variables: { username: username },
                data: updatedFavorites
            })
        }
    })

    const { data } = useQuery(CHECK_IF_FAVORITE, {
        variables: {
            username,
            type: props.type,
            targetId: parseInt(props.id)
        }
    })

    useEffect(() => {
        if (data && data.checkIfFavorite) {
            setIsFavorite(data.checkIfFavorite)
        }
    }, [data, username])

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
                        targetId: parseInt(props.id)
                    }
                })
                if (data && data.addFavorite) {
                    customToast('emoji', 'Added to favorites', '💖')
                    setIsFavorite(true)
                }
            } else {
                const { data } = await removeFavorite({
                    variables: {
                        username: username,
                        type: props.type,
                        targetId: parseInt(props.id)
                    }
                })
                if (data && data.removeFavorite) {
                    customToast('emoji', 'Removed from favorites', '💔')
                    setIsFavorite(false)
                }
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2))
            customToast('error', 'Failed to add to favorites')
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

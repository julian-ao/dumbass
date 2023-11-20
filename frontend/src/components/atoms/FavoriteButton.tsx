import { useSelector } from 'react-redux'
import useFavorite from '../../hooks/useFavorite'
import { RootState } from '../../redux/store'
import { customToast } from '../../lib/utils'
import { useEffect, useState } from 'react'

/**
 * @typedef {Object} FavoriteButtonProps
 * @property {string} type - The type of the item to be favorited or unfavorited (Artist/Song).
 * @property {string} id - The unique identifier of the item.
 */
type FavoriteButtonProps = {
    type: string
    id: string
}

/**
 * The `FavoriteButton` component allows users to add or remove items from their favorites.
 *
 * This component interacts with GraphQL mutations and queries to manage favorites for a user.
 * It uses the Apollo Client's `useMutation` and `useQuery` hooks to perform add/remove favorite operations and check the current favorite status.
 * The button's text and styling change based on whether the item is currently a favorite.
 *
 * The component's state includes `isFavorite` to track the favorite status and `isCheckingFavorite` to handle the loading state during API interactions.
 * Error handling and success messages are managed using `customToast` from '../../lib/utils'.
 * The button is disabled while checking the favorite status to prevent repeated clicks.
 *
 * @param {FavoriteButtonProps} props - Properties to configure the favorite button.
 * @returns {JSX.Element} The rendered button for adding/removing favorites.
 */
export const FavoriteButton = (props: FavoriteButtonProps) => {
    const username = useSelector((state: RootState) => state.user.username)
    const {
        addFavoriteMutation,
        removeFavoriteMutation,
        checkIfFavoriteData,
        error
    } = useFavorite(props.type, props.id, username)
    const [isCheckingFavorite, setIsCheckingFavorite] = useState(false)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    const toggleFavorite = async () => {
        if (!username) {
            customToast('error', 'You need to login to add to favorites')
            return
        }

        setIsCheckingFavorite(true)

        try {
            if (!isFavorite) {
                await addFavoriteMutation()
                customToast('emoji', 'Added to favorites', '💖')
                setIsFavorite(true)
            } else {
                await removeFavoriteMutation()
                customToast('emoji', 'Removed from favorites', '💔')
                setIsFavorite(false)
            }
        } catch (error) {
            customToast('error', 'Something went wrong, please try again')
            console.error(error)
        } finally {
            setIsCheckingFavorite(false)
        }
    }

    useEffect(() => {
        if (error) {
            customToast('error', 'Failed to check if favorite')
        }

        if (checkIfFavoriteData && checkIfFavoriteData.checkIfFavorite) {
            setIsFavorite(checkIfFavoriteData.checkIfFavorite)
        }
    }, [checkIfFavoriteData, error])

    useEffect(() => {
        if (!username) {
            setIsFavorite(false)
        }
    }, [username])
    return (
        <button
            type='button'
            onClick={toggleFavorite}
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

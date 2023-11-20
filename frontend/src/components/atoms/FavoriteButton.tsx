import { useSelector } from 'react-redux'
import useFavorite from '../../hooks/useFavorite'
import { RootState } from '../../redux/store'
import { customToast } from '../../lib/utils'
import { useEffect, useState } from 'react'

type FavoriteButtonProps = {
    type: string
    id: string
}

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

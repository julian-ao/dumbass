import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'
import {
    faStar as faStarEmpty,
    faStarHalfStroke as faStarHalf
} from '@fortawesome/free-regular-svg-icons'

export const formatNumberWithSuffix = (input: number | string): string => {
    if (input === undefined) {
        return '' // or any other default value if needed
    }

    const number = typeof input === 'string' ? parseFloat(input) : input

    if (isNaN(number)) {
        return '' // Handle the case where the input is not a valid number
    }

    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'
    } else {
        return number.toString()
    }
}

export const formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short'
    }
    const formattedDate = new Date(dateString).toLocaleDateString(
        'en-US',
        options
    )

    return formattedDate.replace(',', '.')
}

export const getStarIcons = (rating: number) => {
    const roundedRating = Math.round(rating * 2) / 2

    return Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(roundedRating)) {
            return faStarFull
        } else if (
            index === Math.floor(roundedRating) &&
            roundedRating % 1 !== 0
        ) {
            return faStarHalf
        } else {
            return faStarEmpty
        }
    })
}

import toast from 'react-hot-toast'

export const customToast = (
    type: 'success' | 'error' | 'emoji',
    message: string,
    emoji?: string
) => {
    if (type === 'success') {
        toast.success(message, {
            style: {
                padding: '14px',
                color: '#696d7d'
            },
            iconTheme: {
                primary: '#8fc0a9',
                secondary: '#FFFAEE'
            }
        })
        return
    }
    if (type === 'error') {
        toast.error(message, {
            style: {
                padding: '14px',
                color: '#696d7d'
            },
            iconTheme: {
                primary: 'red',
                secondary: '#FFFAEE'
            }
        })
        return
    }
    if (type === 'emoji') {
        toast.custom(message, {
            style: {
                padding: '14px',
                color: '#696d7d'
            },
            iconTheme: {
                primary: 'red',
                secondary: '#FFFAEE'
            },
            icon: emoji
        })
        return
    }
}

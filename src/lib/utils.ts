import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'
import {
    faStar as faStarEmpty,
    faStarHalfStroke as faStarHalf
} from '@fortawesome/free-regular-svg-icons'

/**
 * @function formatNumberWithSuffix
 * 
 * Format a number or a string that can be parsed to a number, appending a 
 * "K" or "M" suffix depending on its magnitude.
 * 
 * - >= 1,000,000: uses the "M" suffix (e.g., 1.5M)
 * - >= 1,000: uses the "K" suffix (e.g., 150.5K)
 * 
 * If the input is not a number or a numeric string, an empty string is returned.
 * 
 * @param {number | string} input - The number or numeric string to be formatted.
 * 
 * @returns {string} Formatted string with appropriate suffix.
 */
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

/**
 * @function formatDateString
 * 
 * Formats a date string into a human-readable format.
 * 
 * The formatted date will be in the form "month year" (e.g., "Jan. 2022"),
 * and it's intended primarily for en-US locale.
 * 
 * @param {string} dateString - The date string to be formatted.
 * 
 * @returns {string} Formatted string representing the date.
 */
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

/**
 * @function getStarIcons
 * 
 * Generates an array of star icons based on the provided rating.
 * 
 * The rating is rounded to the nearest 0.5 and determines the number of full,
 * half, and empty star icons to be returned in the array.
 * 
 * - Full star: rating >= 1
 * - Half star: rating has a fraction
 * - Empty star: otherwise
 * 
 * @param {number} rating - The numeric rating, ideally between 0 and 5.
 * 
 * @returns {("faStarFull" | "faStarHalf" | "faStarEmpty")[]} An array containing
 *          star icon references, which will be one of: "faStarFull", "faStarHalf",
 *          or "faStarEmpty".
 */
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
        toast.success(message, {
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

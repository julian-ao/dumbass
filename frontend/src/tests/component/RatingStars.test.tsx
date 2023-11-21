import { render, screen, fireEvent } from '@testing-library/react'
import { test, vi } from 'vitest'
import '@testing-library/jest-dom'
import RatingStars from '../../components/atoms/RatingStars'

// Testing the RatingStars component
test('renders correct number of stars based on rating', () => {
    const rating = 3.5
    render(<RatingStars rating={rating} changeToOne={false} />)

    const stars = screen.getAllByTestId('img')
    expect(stars.length).toBe(5) // Assuming getStarIcons function returns 5 stars for a rating of 3.5
})

test('renders stars with correct size and color', () => {
    const size = 'large'
    const color = 'yellow'
    render(
        <RatingStars rating={4} changeToOne={false} size={size} color={color} />
    )

    const firstStar = screen.getAllByTestId('img')[0]
    expect(firstStar).toHaveClass('text-yellow-500')
})

test('changes to one star on narrow screens when changeToOne is true', () => {
    render(<RatingStars rating={4} changeToOne={true} />)

    // Check for the single star display on narrow screens
    const oneStarSection = screen.getByTestId('single-star-icon')
    expect(oneStarSection).toBeInTheDocument()
})

test('calls updateRating on star click', async () => {
    const mockUpdateRating = vi.fn()
    render(
        <RatingStars
            rating={3}
            changeToOne={false}
            updateRating={mockUpdateRating}
        />
    )

    const thirdStar = screen.getAllByTestId('img')[2]
    fireEvent.click(thirdStar)

    expect(mockUpdateRating).toHaveBeenCalledWith(3)
})

test('displays number of ratings correctly', () => {
    const numOfRatings = 123
    render(
        <RatingStars
            rating={4}
            changeToOne={false}
            numOfRatings={numOfRatings}
        />
    )

    const ratingsDisplay = screen.getByTestId('ArtistSongCard-numOfRatings')
    expect(ratingsDisplay).toHaveTextContent('(123)') // Assuming formatNumberWithSuffix works correctly
})

import { render, screen, fireEvent } from '@testing-library/react'
import { test, vi } from 'vitest'
import '@testing-library/jest-dom'
import RatingStars from '../../../components/atoms/RatingStars'

// Test to verify that the correct number of star icons are rendered based on the rating
test('renders correct number of stars based on rating', () => {
    // Define a sample rating
    const rating = 3.5

    // Render the RatingStars component with the given rating
    render(<RatingStars rating={rating} changeToOne={false} />)

    // Get all star icons by their test ID and assert the correct number are rendered
    const stars = screen.getAllByTestId('img')
    expect(stars.length).toBe(5) // Expecting 5 stars for a rating of 3.5
})

// Test to check if stars are rendered with the correct size and color
test('renders stars with correct size and color', () => {
    // Define sample size and color for the stars
    const size = 'large'
    const color = 'yellow'

    // Render the RatingStars component with the specified size and color
    render(
        <RatingStars rating={4} changeToOne={false} size={size} color={color} />
    )

    // Get the first star and assert it has the correct color class
    const firstStar = screen.getAllByTestId('img')[0]
    expect(firstStar).toHaveClass('text-yellow-500') // Check if the star has the expected color class
})

// Test for responsive behavior - displaying a single star on narrow screens
test('changes to one star on narrow screens when changeToOne is true', () => {
    // Render the RatingStars component with changeToOne set to true
    render(<RatingStars rating={4} changeToOne={true} />)

    // Assert that a single star icon section is present for narrow screens
    const oneStarSection = screen.getByTestId('single-star-icon')
    expect(oneStarSection).toBeInTheDocument()
})

// Test to verify that the provided updateRating function is called on star click
test('calls updateRating on star click', async () => {
    // Mock function for updateRating
    const mockUpdateRating = vi.fn()

    // Render the RatingStars component with the mock updateRating function
    render(
        <RatingStars
            rating={3}
            changeToOne={false}
            updateRating={mockUpdateRating}
        />
    )

    // Simulate a click on the third star
    const thirdStar = screen.getAllByTestId('img')[2]
    fireEvent.click(thirdStar)

    // Assert that the updateRating function was called with the correct rating value
    expect(mockUpdateRating).toHaveBeenCalledWith(3)
})

// Test to verify that the number of ratings is displayed correctly
test('displays number of ratings correctly', () => {
    // Define a sample number of ratings
    const numOfRatings = 123

    // Render the RatingStars component with the given number of ratings
    render(
        <RatingStars
            rating={4}
            changeToOne={false}
            numOfRatings={numOfRatings}
        />
    )

    // Assert that the text displaying the number of ratings is correct
    const ratingsDisplay = screen.getByTestId('ArtistSongCard-numOfRatings')
    expect(ratingsDisplay).toHaveTextContent('(123)') // Assuming formatNumberWithSuffix works correctly
})

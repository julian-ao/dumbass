import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test } from 'vitest'
import CardView from '../../../components/organisms/CardView'
import { MemoryRouter } from 'react-router-dom'
import {
    ArtistCardProps,
    SongCardProps
} from '../../../components/molecules/ArtistSongCard'

// Test for rendering the title of the CardView component
test('renders title correctly', () => {
    // Providing a title to render
    const title = 'Test Title'

    // Rendering the CardView component with the given title and empty card data
    render(<CardView title={title} cardData={[]} />)

    // Checking if the title is present in the document
    expect(screen.getByText(title)).toBeInTheDocument()
})

// Test for rendering multiple cards based on provided card data
test('renders cards based on cardData', () => {
    // Mock data for cards, including two artist cards
    const cardData: Array<ArtistCardProps | SongCardProps> = [
        // First artist card data
        {
            cardType: 'artist',
            id: '1',
            title: 'Artist 1',
            alternateNames: ['Alternate name 1', 'Alternate name 2'],
            rating: 4.2,
            numOfRatings: 30
        },
        // Second artist card data
        {
            cardType: 'artist',
            id: '2',
            title: 'Artist 2',
            alternateNames: ['Alternate name 3', 'Alternate name 4'],
            rating: 2.4,
            numOfRatings: 40
        }
    ]

    // Rendering CardView with the mock data
    render(
        <MemoryRouter>
            <CardView cardData={cardData} />
        </MemoryRouter>
    )

    // Asserting that each artist's title is rendered
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
    expect(screen.getByText('Artist 2')).toBeInTheDocument()

    // Asserting that alternate names for each artist are rendered correctly
    expect(
        screen.getByText('AKA: Alternate name 1, Alternate name 2')
    ).toBeInTheDocument()
    expect(
        screen.getByText('AKA: Alternate name 3, Alternate name 4')
    ).toBeInTheDocument()
})

// Test for rendering a custom error message when there is no card data
test('renders custom error message when no cardData', () => {
    // Custom error message to be displayed
    const customErrorMessage = 'Custom Error Message'

    // Rendering CardView with no data and a custom error message
    render(
        <MemoryRouter>
            <CardView cardData={[]} customErrorMessage={customErrorMessage} />
        </MemoryRouter>
    )

    // Asserting that the custom error message is displayed
    expect(screen.getByText(customErrorMessage)).toBeInTheDocument()
})

// Test for rendering a default error message when there is no card data and no custom error message provided
test('renders default error message when no cardData and no custom message', () => {
    // Rendering CardView with no data and without a custom error message
    render(
        <MemoryRouter>
            <CardView cardData={[]} />
        </MemoryRouter>
    )

    // Asserting that the default error message 'No data found...' is displayed
    expect(screen.getByText('No data found...')).toBeInTheDocument()
})

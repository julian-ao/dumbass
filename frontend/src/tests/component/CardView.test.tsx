import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test } from 'vitest'
import CardView from '../../components/organisms/CardView'
import { MemoryRouter } from 'react-router-dom'
import {
    ArtistCardProps,
    SongCardProps
} from '../../components/molecules/ArtistSongCard'

test('renders title correctly', () => {
    const title = 'Test Title'
    render(<CardView title={title} cardData={[]} />)
    expect(screen.getByText(title)).toBeInTheDocument()
})

test('renders cards based on cardData', () => {
    const cardData: Array<ArtistCardProps | SongCardProps> = [
        {
            cardType: 'artist',
            id: '1',
            title: 'Artist 1',
            alternateNames: ['Alternate name 1', 'Alternate name 2'],
            rating: 4.2,
            numOfRatings: 30
        },
        {
            cardType: 'artist',
            id: '2',
            title: 'Artist 2',
            alternateNames: ['Alternate name 3', 'Alternate name 4'],
            rating: 2.4,
            numOfRatings: 40
        }
    ]
    render(
        <MemoryRouter>
            <CardView cardData={cardData} />
        </MemoryRouter>
    )

    expect(screen.getByText('Artist 1')).toBeInTheDocument()
    expect(screen.getByText('Artist 2')).toBeInTheDocument()

    expect(
        screen.getByText('AKA: Alternate name 1, Alternate name 2')
    ).toBeInTheDocument()
    expect(
        screen.getByText('AKA: Alternate name 3, Alternate name 4')
    ).toBeInTheDocument()
})

test('renders custom error message when no cardData', () => {
    const customErrorMessage = 'Custom Error Message'
    render(
        <MemoryRouter>
            <CardView cardData={[]} customErrorMessage={customErrorMessage} />
        </MemoryRouter>
    )
    expect(screen.getByText(customErrorMessage)).toBeInTheDocument()
})

test('renders default error message when no cardData and no custom message', () => {
    render(
        <MemoryRouter>
            <CardView cardData={[]} />
        </MemoryRouter>
    )
    expect(screen.getByText('No data found...')).toBeInTheDocument()
})

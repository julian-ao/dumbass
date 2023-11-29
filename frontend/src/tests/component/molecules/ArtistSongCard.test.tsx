import { fireEvent, render, screen } from '@testing-library/react'
import ArtistSongCard from '../../../components/molecules/ArtistSongCard'
import { test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import * as ReactRouterDom from 'react-router-dom'
import '@testing-library/jest-dom'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await import('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})
test('Test that the ArtistSongCard renders with Artist mock data', () => {
    render(
        <MemoryRouter>
            <ArtistSongCard
                cardType='artist'
                imageUrl='https://i1.sndcdn.com/artworks-5M1wsAL8ySiHG4ne-BLcO3A-t300x300.jpg'
                id='123'
                title='test'
                alternateNames={['test1', 'test2']}
                rating={5}
                numOfRatings={10}
            />
        </MemoryRouter>
    )

    // Image
    const imageElement = screen.getByTestId('ArtistSongCard-image')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute(
        'src',
        'https://i1.sndcdn.com/artworks-5M1wsAL8ySiHG4ne-BLcO3A-t300x300.jpg'
    )

    // Title
    const titleElement = screen.getByTestId('ArtistSongCard-title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('test')

    // Subtitle
    const subtitleElement = screen.getByRole('ArtistSongCard-subtitle')
    expect(subtitleElement).toBeInTheDocument()
    expect(subtitleElement).toHaveTextContent('AKA: test1, test2')

    // Rating
    const ratingElement = screen.getByRole('ArtistSongCard-rating')
    expect(ratingElement).toBeInTheDocument()
    expect(ratingElement).toHaveTextContent('5.0')

    // Num of Ratings
    const numOfRatingsElement = screen.getByTestId(
        'ArtistSongCard-numOfRatings'
    )
    expect(numOfRatingsElement).toBeInTheDocument()
    expect(numOfRatingsElement).toHaveTextContent('(10)')

    // Ensure that other elements are not present for an artist card
    expect(
        screen.queryByRole('ArtistSongCard-releaseDate')
    ).not.toBeInTheDocument()
})

test('Test that the ArtistSongCard renders with Song mock data', () => {
    render(
        <MemoryRouter>
            <ArtistSongCard
                cardType='song'
                imageUrl='https://i1.sndcdn.com/artworks-5M1wsAL8ySiHG4ne-BLcO3A-t300x300.jpg'
                id='123'
                title='The Less I Know The Better'
                rating={2.3}
                numOfRatings={40}
                artist='Tame Impala'
                releaseDate='2014-03-17'
            />
        </MemoryRouter>
    )

    // Image
    const imageElement = screen.getByTestId('ArtistSongCard-image')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute(
        'src',
        'https://i1.sndcdn.com/artworks-5M1wsAL8ySiHG4ne-BLcO3A-t300x300.jpg'
    )

    // Title
    const titleElement = screen.getByTestId('ArtistSongCard-title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('The Less I Know The Better')

    // Subtitle
    const subtitleElement = screen.getByRole('ArtistSongCard-subtitle')
    expect(subtitleElement).toBeInTheDocument()
    expect(subtitleElement).toHaveTextContent('Tame Impala')

    // Rating
    const ratingElement = screen.getByRole('ArtistSongCard-rating')
    expect(ratingElement).toBeInTheDocument()
    expect(ratingElement).toHaveTextContent('2.3')

    // Num of Ratings
    const numOfRatingsElement = screen.getByTestId(
        'ArtistSongCard-numOfRatings'
    )
    expect(numOfRatingsElement).toBeInTheDocument()
    expect(numOfRatingsElement).toHaveTextContent('(40)')
})

test('navigates to the correct URL on button click for artist card', () => {
    render(
        <ReactRouterDom.MemoryRouter>
            <ArtistSongCard
                cardType='artist'
                id='123'
                title='test'
                alternateNames={['test1', 'test2']}
                rating={5}
                numOfRatings={10}
            />
        </ReactRouterDom.MemoryRouter>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/artist/123', expect.any(Object))
})

test('Artist card displays correct subtitle and URL', () => {
    render(
        <MemoryRouter>
            <ArtistSongCard
                cardType='artist'
                id='123'
                title='Artist Name'
                alternateNames={['Alt Name 1', 'Alt Name 2']}
                rating={5}
                numOfRatings={10}
            />
        </MemoryRouter>
    )

    const subtitleElement = screen.getByRole('ArtistSongCard-subtitle')
    expect(subtitleElement).toHaveTextContent('AKA: Alt Name 1, Alt Name 2')
})

test('Artist card displays title as subtitle when no alternate names', () => {
    render(
        <MemoryRouter>
            <ArtistSongCard
                cardType='artist'
                id='123'
                title='Artist Name'
                alternateNames={[]}
                rating={5}
                numOfRatings={10}
            />
        </MemoryRouter>
    )

    const subtitleElement = screen.getByRole('ArtistSongCard-subtitle')
    expect(subtitleElement).toHaveTextContent('Artist Name')
})

test('Song card displays correct subtitle and URL', () => {
    render(
        <MemoryRouter>
            <ArtistSongCard
                cardType='song'
                id='123'
                title='Song Title'
                artist='Artist Name'
                rating={5}
                numOfRatings={10}
                releaseDate='2021-01-01'
            />
        </MemoryRouter>
    )

    const subtitleElement = screen.getByRole('ArtistSongCard-subtitle')
    expect(subtitleElement).toHaveTextContent('by Artist Name')
})

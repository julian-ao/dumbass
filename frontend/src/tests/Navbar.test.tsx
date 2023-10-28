import { render, screen } from '@testing-library/react'
import Navbar from '../components/organisms/Navbar'
import { test } from 'vitest'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

test('Test that the Navbar renders with Search and Favorites', async () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    )

    // Title
    const titleElement = screen.getByRole('Navbar-title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('DrumBass')

    // Search
    const exploreElement = screen.getByRole('Navbar-Search')
    expect(exploreElement).toBeInTheDocument()
    expect(exploreElement).toHaveTextContent('Search')

    // Favorites
    const favoritesElement = screen.getByRole('Navbar-Favorites')
    expect(favoritesElement).toBeInTheDocument()
    expect(favoritesElement).toHaveTextContent('Favorites')
})

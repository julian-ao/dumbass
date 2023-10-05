import { render, screen } from '@testing-library/react'
import Navbar from '../components/molecules/Navbar'
import { test } from 'vitest'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

test('Test that the Navbar renders with Explore, Favorites and Profile button', async () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    )

    // Title
    const titleElement = screen.getByRole('Navbar-title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('DrumBass')

    // Explore
    const exploreElement = screen.getByRole('Navbar-Home')
    expect(exploreElement).toBeInTheDocument()
    expect(exploreElement).toHaveTextContent('Home')

    // Favorites
    const favoritesElement = screen.getByRole('Navbar-Favorites')
    expect(favoritesElement).toBeInTheDocument()
    expect(favoritesElement).toHaveTextContent('Favorites')
})

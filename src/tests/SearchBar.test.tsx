import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../components/molecules/CommonSearchBar'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

test('SearchBar renders without crashing', () => {
    render(
        <MemoryRouter>
            <SearchBar
                filterOptions={['artist', 'song']}
                selectedFilter='artist'
                onFilterChange={() => {}}
            />
        </MemoryRouter>
    )
    const inputElement = screen.getByPlaceholderText(
        /Search for a song or artist/i
    )
    expect(inputElement).toBeInTheDocument()
})

test('Dropdown renders with provided filter options', () => {
    render(
        <MemoryRouter>
            <SearchBar
                filterOptions={['artist', 'song']}
                selectedFilter='artist'
                onFilterChange={() => {}}
            />
        </MemoryRouter>
    )
    let dropdownElement = screen.getByText(/artist/i)
    expect(dropdownElement).toBeInTheDocument()

    render(
        <MemoryRouter>
            <SearchBar
                filterOptions={['artist', 'song']}
                selectedFilter='song'
                onFilterChange={() => {}}
            />
        </MemoryRouter>
    )
    dropdownElement = screen.getByText(/song/i)
    expect(dropdownElement).toBeInTheDocument()
})

test('Search icon is rendered', () => {
    render(
        <MemoryRouter>
            <SearchBar
                filterOptions={['artist', 'song']}
                selectedFilter='artist'
                onFilterChange={() => {}}
            />
        </MemoryRouter>
    )
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
})

test('Dropdown is shown when text is input', async () => {
    render(
        <MemoryRouter>
            <SearchBar
                filterOptions={['artist', 'song']}
                selectedFilter='artist'
                onFilterChange={() => {}}
            />
        </MemoryRouter>
    )
    const inputElement = screen.getByPlaceholderText(
        /Search for a song or artist/i
    )
    fireEvent.change(inputElement, { target: { value: 'Eminem' } })
    const dropdownElement = await screen.findByText(/Eminem/i)
    expect(dropdownElement).toBeInTheDocument()
})

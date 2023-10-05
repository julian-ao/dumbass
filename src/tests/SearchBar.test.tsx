import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../components/molecules/SearchBar'
import '@testing-library/jest-dom'

test('SearchBar renders without crashing', () => {
    render(
        <SearchBar
            filterOptions={['artist', 'song']}
            selectedFilter='artist'
            onFilterChange={() => {}}
        />
    )
    const inputElement = screen.getByPlaceholderText(
        /Search for a song, artist, or album.../i
    )
    expect(inputElement).toBeInTheDocument()
})

test('Dropdown renders with provided filter options', () => {
    render(
        <SearchBar
            filterOptions={['artist', 'song']}
            selectedFilter='artist'
            onFilterChange={() => {}}
        />
    )
    let dropdownElement = screen.getByText(/artist/i)
    expect(dropdownElement).toBeInTheDocument()

    render(
        <SearchBar
            filterOptions={['artist', 'song']}
            selectedFilter='song'
            onFilterChange={() => {}}
        />
    )
    dropdownElement = screen.getByText(/song/i)
    expect(dropdownElement).toBeInTheDocument()
})

test('Search icon is rendered', () => {
    render(
        <SearchBar
            filterOptions={['artist', 'song']}
            selectedFilter='artist'
            onFilterChange={() => {}}
        />
    )
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
})

test('Dropdown is shown when text is input', async () => {
    render(
        <SearchBar
            filterOptions={['artist', 'song']}
            selectedFilter='artist'
            onFilterChange={() => {}}
        />
    )
    const inputElement = screen.getByPlaceholderText(
        /Search for a song, artist, or album.../i
    )
    fireEvent.change(inputElement, { target: { value: 'Eminem' } })
    const dropdownElement = await screen.findByText(/Eminem/i)
    expect(dropdownElement).toBeInTheDocument()
})

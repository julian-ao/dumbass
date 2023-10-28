import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import SearchBar from '../components/molecules/CommonSearchBar'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import Dropdown from '../components/atoms/Dropdown'

afterEach(cleanup);

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

test('Dropdown displays "Artist" and "Song" in filter options', async () => {
    const filterOptions = ['artist', 'song'];
  
    render(
        <Dropdown
            selectedFilter={filterOptions[0]} 
            filterOptions={filterOptions}
            onFilterChange={() => {}}
        />
    );
  
    // Open the dropdown menu
    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);
  
    // Wait for and verify that "Artist" and "Song" are displayed in the dropdown menu
    await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: /artist/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /song/i })).toBeInTheDocument();
    });
    
    
});

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

import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import SearchBar from '../../../components/molecules/SearchBar'
import { BrowserRouter as Router } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { SEARCHBAR_DROPDOWN } from '../../../graphql/queries/searchbarQueries'

describe('SearchBar Component', () => {
    const mockResponse = [
        {
            request: {
                query: SEARCHBAR_DROPDOWN,
                variables: {
                    searchType: 'song',
                    searchString: 'test',
                    limit: 5
                }
            },
            result: {
                data: {
                    searchSearchbar: [
                        { id: '1', title: 'Song 1' },
                        { id: '2', title: 'Song 2' },
                        { id: '3', title: 'Song 3' },
                        { id: '4', title: 'Song 4' },
                        { id: '5', title: 'Song 5' }
                    ]
                }
            }
        }
    ]
    test('renders without crashing', () => {
        const { getByPlaceholderText } = render(
            <MockedProvider>
                <Router>
                    <SearchBar />
                </Router>
            </MockedProvider>
        )
        expect(
            getByPlaceholderText('Search for a song or artist')
        ).toBeInTheDocument()
    })

    test('no dropdown when search term is empty', () => {
        const { getByPlaceholderText, queryByTestId } = render(
            <MockedProvider>
                <Router>
                    <SearchBar />
                </Router>
            </MockedProvider>
        )

        // Ensure the search term is empty
        const searchInput = getByPlaceholderText('Search for a song or artist')
        fireEvent.change(searchInput, { target: { value: '' } })

        // Check that the dropdown is not present
        const dropdown = queryByTestId('dropdown-SearchBar')
        expect(dropdown).not.toBeInTheDocument()
    })

    /* test('write and click enter in search bar', async () => {
        const { getByPlaceholderText } = render(
            <MockedProvider mocks={mockResponse} addTypename={false}>
                <Router>
                    <SearchBar
                        filterOptions={['filter1', 'filter2']}
                        selectedFilter='filter1'
                        onFilterChange={vi.fn()}
                    />
                </Router>
            </MockedProvider>
        )

        // Simulate entering a search term
        const searchInput = getByPlaceholderText('Search for a song or artist')
        fireEvent.click(searchInput)
        fireEvent.change(searchInput, { target: { value: 'test' } })

        // Simulate pressing enter
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })
    }) */
})

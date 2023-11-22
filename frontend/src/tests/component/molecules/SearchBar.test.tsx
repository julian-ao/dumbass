import { describe, test, expect } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import SearchBar from '../../../components/molecules/SearchBar'
import { BrowserRouter as Router } from 'react-router-dom'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import '@testing-library/jest-dom'

const mocks:
    | readonly MockedResponse<Record<string, any>, Record<string, any>>[]
    | undefined = []

describe('SearchBar Component', () => {
    test('renders without crashing', () => {
        const { getByPlaceholderText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <SearchBar />
                </Router>
            </MockedProvider>
        )
        expect(
            getByPlaceholderText('Search for a song or artist')
        ).toBeInTheDocument()
    })

    //test('dropdown becomes visible on valid search term', async () => {
    //    // Simulate user typing a search term
    //    const searchInput = getByPlaceholderText('Search for a song or artist')
    //    fireEvent.change(searchInput, { target: { value: 'test' } })
//
    //    // Wait for the dropdown to become visible
    //    const dropdown = await findByTestId('dropdown-SearchBar')
    //    expect(dropdown).toBeInTheDocument()
    //})

    test('no dropdown when search term is empty', () => {
        const { getByPlaceholderText, queryByTestId } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
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
})

import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { test, vi } from 'vitest'
import configureMockStore from 'redux-mock-store'
import { FavoriteButton } from '../../components/atoms/FavoriteButton'
import { customToast } from '../../lib/utils'
import useFavorite from '../../hooks/useFavorite'

// Mocking useFavorite hook
vi.mock('../../hooks/useFavorite', () => {
    const addFavoriteMutation = vi.fn().mockResolvedValue({})
    const removeFavoriteMutation = vi.fn().mockResolvedValue({})
    return {
        __esModule: true,
        default: vi.fn(() => ({
            addFavoriteMutation,
            removeFavoriteMutation,
            checkIfFavoriteData: { checkIfFavorite: false },
            error: null
        })),
        addFavoriteMutation,
        removeFavoriteMutation
    }
})

// Mocking the customToast function
vi.mock('../../lib/utils', () => ({
    customToast: vi.fn()
}))

// Setup a mock Redux store
const mockStore = configureMockStore()
const initialState = { user: { loggedIn: true, username: 'testUser' } }
const store = mockStore(initialState)

// Test for adding a favorite
test('calls addFavoriteMutation when a logged-in user clicks to add to favorites', async () => {
    // Mocking the hook behavior for an item that is not a favorite
    const addFavoriteMutation = vi.fn().mockResolvedValue({})
    const removeFavoriteMutation = vi.fn()
    vi.mocked(useFavorite).mockReturnValue({
        addFavoriteMutation,
        removeFavoriteMutation,
        checkIfFavoriteData: { checkIfFavorite: false },
        error: undefined
    })

    render(
        <Provider store={store}>
            <FavoriteButton type='song' id='1' />
        </Provider>
    )

    const button = screen.getByRole('button', { name: 'Favorite' })
    await act(async () => {
        fireEvent.click(button)
    })

    // Expect the addFavoriteMutation to be called
    expect(addFavoriteMutation).toHaveBeenCalled()
    expect(removeFavoriteMutation).not.toHaveBeenCalled()
})

// Test for removing a favorite
test('calls removeFavoriteMutation when a logged-in user clicks to remove from favorites', async () => {
    // Mocking the hook behavior for an item that is already a favorite
    const addFavoriteMutation = vi.fn()
    const removeFavoriteMutation = vi.fn().mockResolvedValue({})
    vi.mocked(useFavorite).mockReturnValue({
        addFavoriteMutation,
        removeFavoriteMutation,
        checkIfFavoriteData: { checkIfFavorite: true },
        error: undefined
    })

    render(
        <Provider store={store}>
            <FavoriteButton type='song' id='1' />
        </Provider>
    )

    const button = screen.getByRole('button', { name: 'Remove favorite' })
    await act(async () => {
        fireEvent.click(button)
    })

    // Expect the removeFavoriteMutation to be called
    expect(removeFavoriteMutation).toHaveBeenCalled()
    expect(addFavoriteMutation).not.toHaveBeenCalled()
})

test('FavoriteButton handles error during favorite mutation', async () => {
    // Mock useFavorite to simulate an error
    vi.mocked(useFavorite).mockReturnValueOnce({
        addFavoriteMutation: vi
            .fn()
            .mockRejectedValue(new Error('Mutation error')),
        removeFavoriteMutation: vi.fn().mockResolvedValue({}),
        checkIfFavoriteData: { checkIfFavorite: false },
        error: undefined
    })

    render(
        <Provider store={store}>
            <FavoriteButton type='song' id='1' />
        </Provider>
    )

    const button = screen.getByRole('button', { name: 'Favorite' })
    await act(async () => {
        fireEvent.click(button)
    })

    // Expect an error toast to be shown
    expect(customToast).toHaveBeenCalledWith(
        'error',
        'Something went wrong, please try again'
    )
})

import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import '@testing-library/jest-dom'
import Navbar from '../../components/organisms/Navbar'
import { setUserLogout } from '../../redux/actions/userActions'

const mockStore = configureMockStore()
const initialState = { user: { loggedIn: false, username: '' } }
const store = mockStore(initialState)

describe('Navbar Component', () => {
    it('renders correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByRole('Navbar-title')).toBeInTheDocument()
    })
})

describe('Navbar Component Interactions', () => {
    it('toggles user dropdown visibility on user photo click', () => {
        const loggedInState = { user: { loggedIn: true, username: 'testuser' } }
        const loggedInStore = mockStore(loggedInState)

        render(
            <Provider store={loggedInStore}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        )

        const userPhoto = screen.getByAltText('user photo')
        fireEvent.click(userPhoto)
        expect(screen.getByText('Sign out')).toBeInTheDocument()
    })

    it('signs out and shows a toast on sign out button click', () => {
        const loggedInState = { user: { loggedIn: true, username: 'testuser' } }
        const loggedInStore = mockStore(loggedInState)

        render(
            <Provider store={loggedInStore}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.click(screen.getByAltText('user photo'))
        fireEvent.click(screen.getByText('Sign out'))

        expect(loggedInStore.getActions()).toContainEqual(setUserLogout())
        expect(localStorage.getItem('username')).toBe('')
        expect(localStorage.getItem('isLoggedIn')).toBe('false')
        // Test for the customToast call if possible
    })

    // Additional tests for mobile dropdown and navigation links...
})

// Tests for Logged-in and Logged-out states...

describe('Navbar Routing', () => {
    it('highlights the active route', () => {
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/favorites']}>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByRole('Navbar-Favorites')).toHaveClass('text-green')
    })
})

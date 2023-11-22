import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import '@testing-library/jest-dom'
import Navbar from '../../../components/organisms/Navbar'
import { setUserLogout } from '../../../redux/actions/userActions'

// Setup a mock Redux store
const mockStore = configureMockStore()
const initialState = { user: { loggedIn: false, username: '' } }
const store = mockStore(initialState)

// Tests for rendering the Navbar component
describe('Navbar Component', () => {
    it('renders correctly', () => {
        // Render the Navbar component within the Redux Provider and MemoryRouter
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        )

        // Check if the Navbar title is present in the document
        expect(screen.getByRole('Navbar-title')).toBeInTheDocument()
    })
})

// Tests for Navbar component interactions
describe('Navbar Component Interactions', () => {
    it('toggles user dropdown visibility on user photo click', () => {
        // Mock state for a logged-in user
        const loggedInState = { user: { loggedIn: true, username: 'testuser' } }
        const loggedInStore = mockStore(loggedInState)

        // Render the Navbar component for a logged-in user
        render(
            <Provider store={loggedInStore}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        )

        // Simulate a click on the user photo to toggle the dropdown
        const userPhoto = screen.getByAltText('user photo')
        fireEvent.click(userPhoto)

        // Check if the 'Sign out' option is present, indicating the dropdown is visible
        expect(screen.getByText('Sign out')).toBeInTheDocument()
    })

    it('signs out and shows a toast on sign out button click', () => {
        // Mock state for a logged-in user
        const loggedInState = { user: { loggedIn: true, username: 'testuser' } }
        const loggedInStore = mockStore(loggedInState)

        // Render the Navbar component for a logged-in user
        render(
            <Provider store={loggedInStore}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        )

        // Simulate a click on the user photo and then on the 'Sign out' button
        fireEvent.click(screen.getByAltText('user photo'))
        fireEvent.click(screen.getByText('Sign out'))

        // Check if the logout action is dispatched and local storage is updated
        expect(loggedInStore.getActions()).toContainEqual(setUserLogout())
        expect(localStorage.getItem('username')).toBe('')
        expect(localStorage.getItem('isLoggedIn')).toBe('false')
        // Test for the customToast call if possible
    })

    // Additional tests for mobile dropdown and navigation links...
})

// Tests for Navbar routing
describe('Navbar Routing', () => {
    it('highlights the active route', () => {
        // Render the Navbar with '/favorites' as the current route
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/favorites']}>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        )

        // Check if the 'Favorites' link is highlighted, indicating it's the active route
        expect(screen.getByRole('Navbar-Favorites')).toHaveClass('text-green')
    })
})

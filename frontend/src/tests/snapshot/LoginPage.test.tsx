import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import LoginPage from '../../components/pages/LoginPage'
import userReducer from '../../redux/reducers/userReducer'

const mockStore = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: {
        user: {
            loggedIn: false,
            username: null
        }
    }
})

test('LoginPage snapshot', () => {
    const { asFragment } = render(
        <Provider store={mockStore}>
            <MockedProvider addTypename={false}>
                <Router>
                    <LoginPage />
                </Router>
            </MockedProvider>
        </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
})

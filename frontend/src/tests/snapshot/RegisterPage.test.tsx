import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import RegisterPage from '../../components/pages/RegisterPage'
import { Provider } from 'react-redux';
import { ADD_USER } from '../../graphql/mutations/userMutations'
import { vi } from 'vitest'
import userReducer from '../../redux/reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
    // eslint-disable-next-line
    BrowserRouter: require('react-router-dom').BrowserRouter
}))

const mockStore = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: {
        user: { loggedIn: true, username: 'testUser' },
    },
});

const mocks = [
    {
        request: {
            query: ADD_USER,
            variables: { username: 'testuser', password: 'password123' }
        },
        result: {
            data: {
                addUser: {
                    username: 'testuser'
                }
            }
        }
    }
]

test('RegisterPage snapshot', () => {
    const { asFragment } = render(
        <Provider store={mockStore}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <RegisterPage />
                </Router>
            </MockedProvider>
        </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
})

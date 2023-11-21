import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import RegisterPage from '../../components/pages/RegisterPage';
import { ADD_USER } from '../../graphql/mutations/userMutations';
import { vi } from 'vitest';

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
    // eslint-disable-next-line
    BrowserRouter: require('react-router-dom').BrowserRouter,
}));



const mocks = [
    {
        request: {
            query: ADD_USER,
            variables: { username: 'testuser', password: 'password123' },
        },
        result: {
            data: {
                addUser: {
                    username: 'testuser'
                }
            }
        }
    }
];

test('RegisterPage snapshot', () => {
    const { asFragment } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Router>
                <RegisterPage />
            </Router>
        </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
});

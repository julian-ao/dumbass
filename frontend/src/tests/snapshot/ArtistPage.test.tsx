import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ArtistPage } from '../../components/pages/ArtistPage';
import { GET_ARTIST_BY_ID } from '../../graphql/queries/artistQueries';
import { vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../redux/reducers/userReducer';
import { Provider } from 'react-redux';

vi.mock('react-router-dom', () => ({
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/artist/1', state: {} }),
    // eslint-disable-next-line
    BrowserRouter: require('react-router-dom').BrowserRouter,
}));

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
            query: GET_ARTIST_BY_ID,
            variables: { id: 1 },
        },
        result: {
            data: {
                getArtistById: {
                    alternate_names: ['Artist Alt Name'],
                    description: 'Artist Description',
                    image_url: 'http://example.com/artist.jpg',
                    name: 'Artist Name',
                    average_rating: 4.5,
                    number_of_ratings: 100,
                }
            }
        }
    }
];

test('ArtistPage snapshot', async () => {
    const { asFragment } = render(
        <Provider store={mockStore}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <ArtistPage />
                </Router>
            </MockedProvider>
        </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
});

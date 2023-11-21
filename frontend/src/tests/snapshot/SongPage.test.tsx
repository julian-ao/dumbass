import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../redux/reducers/userReducer';
import { Provider } from 'react-redux';
import { GET_SONG_BY_ID } from '../../graphql/queries/songQueries';
import { SongPage } from '../../components/pages/SongPage';

vi.mock('react-router-dom', () => ({
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/song/1', state: {} }),
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

// Mock for GraphQL-spørring
const mocks = [
    {
        request: {
            query: GET_SONG_BY_ID,
            variables: { id: 1 },
        },
        result: {
            data: {
                getSongById: {
                    title: 'Test Song',
                    artist_names: ['Test Artist'],
                    header_image_url: 'http://example.com/song.jpg',
                    average_rating: 4.2,
                    number_of_ratings: 80,
                    lyrics: 'Test Lyrics',
                    release_date: '2022-01-01',
                },
            },
        },
    },
];

test('SongPage snapshot', () => {
    const { asFragment } = render(
        <Provider store={mockStore}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <SongPage />
                </Router>
            </MockedProvider>
        </Provider>
        
    );
    expect(asFragment()).toMatchSnapshot();
});

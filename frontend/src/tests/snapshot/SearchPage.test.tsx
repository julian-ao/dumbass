import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import SearchPage from '../../components/pages/SearchPage';
import { COUNT_ARTISTS, GET_ARTISTS_ON_NAME } from '../../graphql/queries/artistQueries';
import { COUNT_SONGS, GET_SONGS_ON_TITLE } from '../../graphql/queries/songQueries';

const mocks = [
    {
        request: {
            query: GET_ARTISTS_ON_NAME,
            variables: {
                name: 'Test Artist',
                limit: 12,
                sort: 'rating',
                page: 1
            },
        },
        result: {
            data: {
                getArtistsOnName: [
                    {
                        id: 1,
                        name: 'Test Artist',
                        alternate_names: ['Test Artist Alias'],
                        image_url: 'http://example.com/artist.jpg',
                        average_rating: 4.5,
                        number_of_ratings: 100
                    },
                ],
            },
        },
    },
    {
        request: {
            query: GET_SONGS_ON_TITLE,
            variables: {
                title: null,
                limit: 12,
                sort: 'relevance',
                page: 1
            },
        },
        result: {
            data: {
                getSongsOnTitle: [
                    {
                        header_image_url: 'http://example.com/song.jpg',
                        id: 1,
                        title: 'Test Song',
                        artist_names: ['Test Artist'],
                        average_rating: 4.2,
                        number_of_ratings: 80,
                        release_date: '2022-01-01'
                    },
                ],
            },
        },
    },
    {
        request: {
            query: COUNT_ARTISTS,
            variables: {
                name: 'Test Artist'
            },
        },
        result: {
            data: {
                countArtists: 0
            },
        },
    },
    {
        request: {
            query: COUNT_SONGS,
            variables: {
                title: null
            },
        },
        result: {
            data: {
                countSongs: 15
            },
        },
    },
];

test('SearchPage snapshot', () => {
    const { asFragment } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Router>
                <SearchPage />
            </Router>
        </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
});

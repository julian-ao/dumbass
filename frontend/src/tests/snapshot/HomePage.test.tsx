import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import HomePage from '../../components/pages/HomePage'
import { GET_ARTISTS_ON_NAME } from '../../graphql/queries/artistQueries'
import { GET_SONGS_ON_TITLE } from '../../graphql/queries/songQueries'

const mocks = [
    {
        request: {
            query: GET_ARTISTS_ON_NAME,
            variables: { limit: 12, sort: 'rating', page: 1 }
        },
        result: {
            data: {
                getArtistsOnName: [
                    {
                        id: '1',
                        name: 'Artist 1',
                        alternate_names: ['A1'],
                        image_url: 'http://example.com/artist1.jpg',
                        average_rating: 4.5,
                        number_of_ratings: 100
                    }
                ]
            }
        }
    },
    {
        request: {
            query: GET_SONGS_ON_TITLE,
            variables: { limit: 12, sort: 'rating', page: 1 }
        },
        result: {
            data: {
                getSongsOnTitle: [
                    {
                        header_image_url: 'http://example.com/song1.jpg',
                        id: '1',
                        title: 'Song 1',
                        artist_names: ['Artist 1', 'Artist 2'],
                        average_rating: 4.7,
                        number_of_ratings: 150,
                        release_date: '2021-01-01'
                    }
                ]
            }
        }
    }
]

test('HomePage snapshot', () => {
    const { asFragment } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Router>
                <HomePage />
            </Router>
        </MockedProvider>
    )
    expect(asFragment()).toMatchSnapshot()
})

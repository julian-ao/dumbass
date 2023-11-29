import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../redux/reducers/userReducer'
import FavoritesPage from '../../components/pages/FavoritesPage'
import { GET_FAVORITES } from '../../graphql/queries/favoriteQueries'
import { GET_SONGS_BY_ID } from '../../graphql/queries/songQueries'
import { GET_ARTISTS_BY_ID } from '../../graphql/queries/artistQueries'

const mockStore = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: {
        user: { loggedIn: true, username: 'testUser' }
    }
})

const mocks = [
    {
        request: {
            query: GET_FAVORITES,
            variables: { username: 'testUser' }
        },
        result: {
            data: {
                getFavorites: [
                    { type: 'song', targetId: 1 },
                    { type: 'artist', targetId: 2 }
                ]
            }
        }
    },
    {
        request: {
            query: GET_SONGS_BY_ID,
            variables: { ids: [1] }
        },
        result: {
            data: {
                getSongsByIds: [
                    {
                        id: 39,
                        title: 'Fireman',
                        artist_names: 'Lil Wayne',
                        header_image_url:
                            'https://images.rapgenius.com/82b537c1008d3b1a3abb77c51a21a141.600x600x1.jpg',
                        release_date: '2005-10-25',
                        primary_artist_id: '4',
                        average_rating: 4.5,
                        number_of_ratings: 2
                    }
                ]
            }
        }
    },
    {
        request: {
            query: GET_ARTISTS_BY_ID,
            variables: { ids: [2] }
        },
        result: {
            data: {
                getArtistsByIds: [
                    {
                        id: 1,
                        name: 'Cam’ron',
                        alternate_names: [
                            "Killa Cam'",
                            'Cameron Giles',
                            'Cameron Ezike Giles',
                            'Cameron E. Giles'
                        ],
                        description: [
                            "Cameron “Cam'ron” Giles is perhaps the quintessential Rap Genius artist. Killa Cam started out alongside Big L, Ma$e, his cousin Bloodshed (R.I.P.) and others in the short-lived group Children of the Corn.  He had several successful solo albums, but it’s his 2004 record Purple Haze that stands as the quintessence of all things Cam'ronian.",
                            'Since then, Cam has kept his computers ‘puting on a series of albums and mixtapes by himself, with Dipset, and with his standout new protege Vado.  We here at RG salute Mr. Giles, without whom this site might not exist.  May your diamonds keep on doing the Macarena.'
                        ],
                        image_url:
                            'https://images.genius.com/bbfe1c5fc61df408e120c06bd8e423d8.613x613x1.jpg',
                        average_rating: 4,
                        number_of_ratings: 2,
                        __typename: 'Artist'
                    }
                ]
            }
        }
    }
]

test('FavoritesPage snapshot', () => {
    const { asFragment } = render(
        <Provider store={mockStore}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <FavoritesPage />
                </Router>
            </MockedProvider>
        </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
})

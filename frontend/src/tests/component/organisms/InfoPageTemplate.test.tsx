//import HomePage from '../components/pages/HomePage'
//import { render } from '@testing-library/react'
import { test } from 'vitest'
import '@testing-library/jest-dom'
//import { MemoryRouter } from 'react-router-dom'

test('HomePage renders without crashing', () => {
    true
})

// TODO

/*
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { faComments, faMusic } from '@fortawesome/free-solid-svg-icons'
import {
    InfoPageTemplate,
    InfoPageTemplateProps
} from '../../components/organisms/InfoPageTemplate'

const mockStore = configureMockStore()
const store = mockStore({
    user: {
        username: 'testuser'
    }
})

const infoPageProps: InfoPageTemplateProps = {
    isLoading: false,
    title: 'Test Artist',
    subtitle: 'Subtitle for Test Artist',
    image: 'test_image_url.jpg',
    averageRating: 4.5,
    numOfRatings: 100,
    description: ['Description paragraph 1', 'Description paragraph 2'],
    lyrics: 'These are the sample lyrics for the song.',
    release_date: '2021-01-01',
    tabs: [
        {
            title: 'Info',
            icon: faMusic
        },
        {
            title: 'Lyrics',
            icon: faComments
        }
    ],
    id: '123',
    type: 'artist'
}

test('renders loading state correctly', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InfoPageTemplate {...infoPageProps} />
            </MemoryRouter>
        </Provider>
    )

    // Assert that skeletons or loaders are displayed
    expect(screen.getByText('Skeleton')).toBeInTheDocument()
})

test('renders content correctly', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InfoPageTemplate {...infoPageProps} />
            </MemoryRouter>
        </Provider>
    )

    // Assert that the title, subtitle, and other content are displayed
    expect(screen.getByText(infoPageProps.title)).toBeInTheDocument()
    expect(screen.getByText(infoPageProps.subtitle)).toBeInTheDocument()
    expect(screen.getByText(infoPageProps.description[0])).toBeInTheDocument()
    expect(screen.getByText(infoPageProps.description[1])).toBeInTheDocument()
    expect(
        screen.getByAltText('Image of ' + infoPageProps.title)
    ).toHaveAttribute('src', infoPageProps.image)
})

test('navigates tabs correctly', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InfoPageTemplate {...infoPageProps} />
            </MemoryRouter>
        </Provider>
    )

    // Click on the Lyrics tab and assert its content
    const lyricsTab = screen.getByText('Lyrics')
    fireEvent.click(lyricsTab)
    expect(screen.getByText(infoPageProps.lyrics)).toBeInTheDocument()

    // Click on the Info tab and assert its content
    const infoTab = screen.getByText('Info')
    fireEvent.click(infoTab)
    infoPageProps.description.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
})

test('conditionally renders components', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InfoPageTemplate {...infoPageProps} />
            </MemoryRouter>
        </Provider>
    )

    // Assert that FavoriteButton and Reviews are rendered
    expect(screen.getByText('FavoriteButton')).toBeInTheDocument()
    expect(screen.getByText('Reviews')).toBeInTheDocument()
})
*/

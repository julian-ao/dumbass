import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { InfoPageTemplate } from '../../../components/organisms/InfoPageTemplate'
import { faCircleInfo, faComments } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux'
import store from '../../../redux/store'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { GET_REVIEWS_BY_TARGET_ID } from '../../../graphql/queries/reviewQueries'

describe('InfoPageTemplate Component', () => {
    test('render song without crashing', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <InfoPageTemplate
                        isLoading={false}
                        title='Test Title'
                        subtitle='Test Subtitle'
                        image='test.jpg'
                        averageRating={4}
                        numOfRatings={100}
                        tabs={[{ title: 'Lyrics', icon: faComments }]}
                        id='1'
                        type='song'
                        release_date='2021-01-01'
                    />
                </Provider>
            </BrowserRouter>
        )
    })
    test('render artist without crashing', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <InfoPageTemplate
                        isLoading={false}
                        title='Test Title'
                        subtitle='Test Subtitle'
                        image='test.jpg'
                        averageRating={4}
                        numOfRatings={100}
                        tabs={[{ title: 'Info', icon: faCircleInfo }]}
                        id='1'
                        type='artist'
                    />
                </Provider>
            </BrowserRouter>
        )
    })

    test('render the loading state without crashing', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <InfoPageTemplate
                        isLoading={true}
                        title='Test Title'
                        subtitle='Test Subtitle'
                        image='test.jpg'
                        averageRating={4}
                        numOfRatings={100}
                        tabs={[{ title: 'Info', icon: faCircleInfo }]}
                        id='1'
                        type='artist'
                    />
                </Provider>
            </BrowserRouter>
        )
    })

    test('render the review tab without crashing', () => {
        const mockResponses = [
            {
                request: {
                    query: GET_REVIEWS_BY_TARGET_ID,
                    variables: {
                        targetType: 'artist',
                        targetId: 1
                    }
                },
                result: {
                    data: {
                        getReviewsByTarget: [
                            {
                                userName: 'user1',
                                content: 'content1',
                                rating: 4
                            },
                            {
                                userName: 'user2',
                                content: 'content2',
                                rating: 4
                            }
                        ]
                    }
                }
            }
        ]

        const { getByText } = render(
            <MockedProvider mocks={mockResponses} addTypename={false}>
                <BrowserRouter>
                    <Provider store={store}>
                        <InfoPageTemplate
                            isLoading={false}
                            title='Test Title'
                            subtitle='Test Subtitle'
                            image='test.jpg'
                            averageRating={4}
                            numOfRatings={100}
                            tabs={[{ title: 'Info', icon: faCircleInfo }]}
                            description={['test description']}
                            id='1'
                            type='artist'
                        />
                    </Provider>
                </BrowserRouter>
            </MockedProvider>
        )
        expect(getByText('Reviews')).toBeInTheDocument()
        fireEvent.click(getByText('Reviews'))
        expect(getByText('Info')).toBeInTheDocument()
        fireEvent.click(getByText('Info'))
    })
})

import { render, screen } from '@testing-library/react'
import store from '../../redux/store'
import { Provider } from 'react-redux'
import Reviews from '../../components/molecules/Reviews'
import '@testing-library/jest-dom'
import { test, vi } from 'vitest'

// Mock the custom hook
vi.mock('../../hooks/useReviews', () => ({
    default: vi.fn(() => ({
        reviews: [{ userName: 'TestUser', rating: 4, content: 'Great!' }],
        loading: false,
        error: null,
        review: '',
        userRating: 0,
        submitted: false,
        setReview: vi.fn(),
        setUserRating: vi.fn(),
        submitReview: vi.fn()
    }))
}))

test('renders without crashing', () => {
    render(
        <Provider store={store}>
            <Reviews targetId='1' targetType='song' />
        </Provider>
    )

    expect(screen.getByText('Great!')).toBeInTheDocument()
})

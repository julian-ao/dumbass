import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'; // Import if not already done
import '@testing-library/jest-dom';
import Reviews from '../../components/molecules/Reviews';
import { test, vi } from 'vitest';

// Mock the custom hook
vi.mock('../../hooks/useReviews', () => ({
    default: vi.fn(() => ({
        reviews: [{ userName: 'User1', rating: 4, content: 'Great song!' }],
        loading: false,
        error: null,
    }))
}));

// Setup a mock Redux store
const mockStore = configureMockStore();

test('check that submit review elements are present when logged in', () => {
    const loggedInStore = mockStore({ user: { loggedIn: true } });

    render(
        <Provider store={loggedInStore}>
            <Reviews targetId='1' targetType='song' />
        </Provider>
    );

    expect(screen.getByText('Your Review')).toBeInTheDocument();

    // Check if input is rendered with correct type, value, and required attribute
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveAttribute('value', '')

    // Check if submit button is rendered with correct type and value
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
});


test('check that you cannot submit a review when not logged in', () => {
    const loggedOutStore = mockStore({ user: { loggedIn: false } });

    render(
        <Provider store={loggedOutStore}>
            <Reviews targetId='1' targetType='song' />
        </Provider>
    );

    // Check that the submit review elements are not present
    expect(screen.queryByTestId('submitReview')).not.toBeInTheDocument();
    expect(screen.queryByTestId('yourReview')).not.toBeInTheDocument();
    expect(screen.getByText('You need to be logged in to submit a review')).toBeInTheDocument();
});

test('check that reviews are rendered when present', () => {
    const loggedInStore = mockStore({ user: { loggedIn: true } });

    render(
        <Provider store={loggedInStore}>
            <Reviews targetId='1' targetType='song' />
        </Provider>
    );

    // Check that the review is rendered
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('Great song!')).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
});


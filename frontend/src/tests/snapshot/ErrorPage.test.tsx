import { render } from '@testing-library/react';
import { ErrorPage } from '../../components/pages/ErrorPage';
import { expect, test, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

test('ErrorPage snapshot', () => {
    const mockFunction = vi.fn();

    const props = {
        title: "Error Occurred",
        subTitle: "Page Not Found",
        description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
        buttonText: "Go Back",
        buttonFunction: mockFunction
    };

    const { asFragment } = render(
        <Router>
            <ErrorPage {...props} />
        </Router>
    );

    expect(asFragment()).toMatchSnapshot();
});
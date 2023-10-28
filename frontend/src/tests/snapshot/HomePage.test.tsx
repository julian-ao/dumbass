// HomePage.test.tsx
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../../components/pages/HomePage';

test('HomePage snapshot', () => {
    const { asFragment } = render(
        <Router>
            <HomePage />
        </Router>
    );
    expect(asFragment()).toMatchSnapshot();
});
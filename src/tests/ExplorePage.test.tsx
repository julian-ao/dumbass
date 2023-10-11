import ExplorePage from '../pages/ExplorePage'
import { render } from '@testing-library/react'
import { test } from 'vitest'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

test('ExplorePage renders without crashing', () => {
    render(
        <MemoryRouter>
            <ExplorePage />
        </MemoryRouter>
    )
})

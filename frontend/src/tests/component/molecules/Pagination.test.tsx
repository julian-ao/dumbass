import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test, vi } from 'vitest'
import Pagination from '../../../components/molecules/Pagination'

// Test to verify that the Pagination component does not render when there are no pages
test('does not render when totalPages is 0', () => {
    // Render the Pagination component with 0 total pages
    render(
        <Pagination
            currentPage={1}
            totalPages={0}
            onClickPrevious={() => {}}
            onClickNext={() => {}}
            isLoading={false}
        />
    )

    // Expect the pagination text not to be in the document when there are no pages
    expect(screen.queryByText('Page 1 of 0')).not.toBeInTheDocument()
})

// Test to check if the previous and next buttons are disabled/enabled correctly
test('buttons are disabled/enabled correctly', () => {
    // Mock functions for previous and next button clicks
    const mockPrevious = vi.fn()
    const mockNext = vi.fn()

    // Render the Pagination component on the first page of a total of 5 pages
    render(
        <Pagination
            currentPage={1}
            totalPages={5}
            onClickPrevious={mockPrevious}
            onClickNext={mockNext}
            isLoading={false}
        />
    )

    // Find and assert the state of the 'Previous' button
    const previousButton = screen.getByText('Previous').closest('button')
    expect(previousButton).toBeInTheDocument()
    expect(previousButton).toBeDisabled() // Should be disabled on the first page

    // Find and assert the state of the 'Next' button
    const nextButton = screen.getByText('Next').closest('button')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).not.toBeDisabled() // Should be enabled as there are more pages

    // Simulate a click on the 'Next' button and check if the corresponding function is called
    nextButton && fireEvent.click(nextButton)
    expect(mockNext).toHaveBeenCalled()
})

// Test to verify that the Pagination component shows a loading state
test('shows loading state correctly', () => {
    // Render the Pagination component with loading state as true
    render(
        <Pagination
            currentPage={2}
            totalPages={5}
            onClickPrevious={() => {}}
            onClickNext={() => {}}
            isLoading={true}
        />
    )

    // Expect the 'Loading...' text to be present when the component is in a loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()
})

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test, vi } from 'vitest'
import Pagination from '../../components/molecules/Pagination'

test('does not render when totalPages is 0', () => {
    render(
        <Pagination
            currentPage={1}
            totalPages={0}
            onClickPrevious={() => {}}
            onClickNext={() => {}}
            isLoading={false}
        />
    )
    expect(screen.queryByText('Page 1 of 0')).not.toBeInTheDocument()
})

test('buttons are disabled/enabled correctly', () => {
    const mockPrevious = vi.fn()
    const mockNext = vi.fn()

    render(
        <Pagination
            currentPage={1}
            totalPages={5}
            onClickPrevious={mockPrevious}
            onClickNext={mockNext}
            isLoading={false}
        />
    )

    const previousButton = screen.getByText('Previous').closest('button')
    expect(previousButton).toBeInTheDocument()
    expect(previousButton).toBeDisabled()

    const nextButton = screen.getByText('Next').closest('button')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).not.toBeDisabled()

    nextButton && fireEvent.click(nextButton)
    expect(mockNext).toHaveBeenCalled()
})

test('shows loading state correctly', () => {
    render(
        <Pagination
            currentPage={2}
            totalPages={5}
            onClickPrevious={() => {}}
            onClickNext={() => {}}
            isLoading={true}
        />
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
})

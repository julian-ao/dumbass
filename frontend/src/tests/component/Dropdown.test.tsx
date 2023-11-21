import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test, vi } from 'vitest'
import Dropdown from '../../components/atoms/Dropdown'

test('Dropdown renders with the correct initial state', () => {
    const filterOptions = ['Option 1', 'Option 2', 'Option 3']
    const selectedFilter = 'Option 1'
    render(
        <Dropdown
            selectedFilter={selectedFilter}
            filterOptions={filterOptions}
            onFilterChange={() => {}}
        />
    )

    const dropdownButton = screen.getByRole('button', { name: 'Option 1' })
    expect(dropdownButton).toBeInTheDocument()
})

test('Dropdown opens and closes correctly', () => {
    const filterOptions = ['Option 1', 'Option 2', 'Option 3']
    const selectedFilter = 'Option 1'
    render(
        <Dropdown
            selectedFilter={selectedFilter}
            filterOptions={filterOptions}
            onFilterChange={() => {}}
        />
    )

    const dropdownButton = screen.getByRole('button', { name: 'Option 1' })
    fireEvent.click(dropdownButton)
    // Expect the dropdown to be open now
    const option = screen.getByTestId('dropdown-option-Option 2')
    expect(option).toBeInTheDocument()

    // Close the dropdown
    fireEvent.click(dropdownButton)
    // Option should not be visible now
    expect(option).not.toBeVisible()
})

test('Dropdown renders all options and allows selection', () => {
    const filterOptions = ['Option 1', 'Option 2', 'Option 3']
    const selectedFilter = 'Option 1'
    const mockOnFilterChange = vi.fn()
    render(
        <Dropdown
            selectedFilter={selectedFilter}
            filterOptions={filterOptions}
            onFilterChange={mockOnFilterChange}
        />
    )

    const dropdownButton = screen.getByRole('button', { name: 'Option 1' })
    fireEvent.click(dropdownButton)
    const optionToSelect = screen.getByTestId('dropdown-option-Option 2')
    fireEvent.click(optionToSelect)

    expect(mockOnFilterChange).toHaveBeenCalledWith('Option 2')
})

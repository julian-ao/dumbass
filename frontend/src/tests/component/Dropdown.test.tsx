import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test, vi } from 'vitest'
import Dropdown from '../../components/atoms/Dropdown'

// Test to check if the Dropdown component renders with the correct initial state
test('Dropdown renders with the correct initial state', () => {
    // Mock data for dropdown options and the selected filter
    const filterOptions = ['Option 1', 'Option 2', 'Option 3']
    const selectedFilter = 'Option 1'

    // Render the Dropdown component with the provided props
    render(
        <Dropdown
            selectedFilter={selectedFilter}
            filterOptions={filterOptions}
            onFilterChange={() => {}}
        />
    )

    // Assert that the dropdown button is in the document and displays the selected filter
    const dropdownButton = screen.getByRole('button', { name: 'Option 1' })
    expect(dropdownButton).toBeInTheDocument()
})

// Test to check if the Dropdown opens and closes correctly
test('Dropdown opens and closes correctly', () => {
    // Mock data for dropdown options and the selected filter
    const filterOptions = ['Option 1', 'Option 2', 'Option 3']
    const selectedFilter = 'Option 1'

    // Render the Dropdown component
    render(
        <Dropdown
            selectedFilter={selectedFilter}
            filterOptions={filterOptions}
            onFilterChange={() => {}}
        />
    )

    // Simulate a click to open the dropdown
    const dropdownButton = screen.getByRole('button', { name: 'Option 1' })
    fireEvent.click(dropdownButton)

    // Assert that the dropdown options are visible
    const option = screen.getByTestId('dropdown-option-Option 2')
    expect(option).toBeInTheDocument()

    // Simulate another click to close the dropdown
    fireEvent.click(dropdownButton)

    // Assert that the dropdown options are no longer visible
    expect(option).not.toBeVisible()
})

// Test to ensure that all options are rendered and can be selected
test('Dropdown renders all options and allows selection', () => {
    // Mock data for dropdown options and the selected filter
    const filterOptions = ['Option 1', 'Option 2', 'Option 3']
    const selectedFilter = 'Option 1'

    // Mock function to test onFilterChange callback
    const mockOnFilterChange = vi.fn()

    // Render the Dropdown component
    render(
        <Dropdown
            selectedFilter={selectedFilter}
            filterOptions={filterOptions}
            onFilterChange={mockOnFilterChange}
        />
    )

    // Simulate a click to open the dropdown
    const dropdownButton = screen.getByRole('button', { name: 'Option 1' })
    fireEvent.click(dropdownButton)

    // Simulate selecting an option
    const optionToSelect = screen.getByTestId('dropdown-option-Option 2')
    fireEvent.click(optionToSelect)

    // Assert that the onFilterChange callback was called with the correct value
    expect(mockOnFilterChange).toHaveBeenCalledWith('Option 2')
})

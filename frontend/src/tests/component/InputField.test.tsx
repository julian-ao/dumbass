import { render, screen, fireEvent } from '@testing-library/react'
import { test, vi } from 'vitest'
import InputField from '../../components/atoms/InputField'
import '@testing-library/jest-dom'

// Testing the InputField component
test('renders InputField with the correct props', () => {
    const mockOnChange = vi.fn() // Using Vitest's mock function
    render(
        <InputField
            id='test-input'
            type='text'
            title='Test Input'
            value='Hello'
            onChange={mockOnChange}
            required
        />
    )

    // Check if label is rendered and associated with input
    const labelElement = screen.getByText('Test Input')
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveAttribute('for', 'test-input')

    // Check if input is rendered with correct type, value, and required attribute
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveAttribute('value', 'Hello')
    expect(inputElement).toBeRequired()

    // Simulate user typing in the input and verify onChange is called
    fireEvent.change(inputElement, { target: { value: 'World' } })
    expect(mockOnChange).toHaveBeenCalledWith('World')
})

test('InputField handles className prop correctly', () => {
    render(
        <InputField
            id='test-class'
            type='text'
            title='Class Test'
            value=''
            onChange={() => {}}
            className='custom-class'
        />
    )

    // Check if the custom class is applied to the main container
    const containerElement = screen.getByLabelText('Class Test').parentNode
    expect(containerElement).toHaveClass('custom-class')
})

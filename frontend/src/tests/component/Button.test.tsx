import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test, vi } from 'vitest'
import Button from '../../components/atoms/Button'

test('Button renders with the correct title and type', () => {
    render(<Button title='Click Me' type='submit' />)

    // Find the button element by its role and name
    const buttonElement = screen.getByRole('button', { name: 'Click Me' })

    // Check if the button is in the document
    expect(buttonElement).toBeInTheDocument()

    // Verify if the button's type attribute is set to 'submit'
    expect(buttonElement).toHaveAttribute('type', 'submit')
})

test('Button accepts and applies additional className', () => {
    render(<Button title='Click Me' type='button' className='extra-class' />)

    // Find the button element by its role and name
    const buttonElement = screen.getByRole('button', { name: 'Click Me' })

    // Check if the button has the 'extra-class' as part of its className
    expect(buttonElement).toHaveClass('extra-class')
})

test('Button onClick handler is called when clicked', () => {
    // Create a mock function for the onClick event handler
    const mockOnClick = vi.fn()

    // Render the Button with the mock function passed to the onClick prop
    render(<Button title='Click Me' type='button' onClick={mockOnClick} />)

    // Find the button element and simulate a click event
    const buttonElement = screen.getByRole('button', { name: 'Click Me' })
    fireEvent.click(buttonElement)

    // Assert that the mock function was called upon clicking the button
    expect(mockOnClick).toHaveBeenCalled()
})

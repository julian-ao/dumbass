import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { test, vi } from 'vitest'
import Button from '../../components/atoms/Button'

test('Button renders with the correct title and type', () => {
    render(<Button title='Click Me' type='submit' />)

    const buttonElement = screen.getByRole('button', { name: 'Click Me' })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveAttribute('type', 'submit')
})

test('Button accepts and applies additional className', () => {
    render(<Button title='Click Me' type='button' className='extra-class' />)

    const buttonElement = screen.getByRole('button', { name: 'Click Me' })
    expect(buttonElement).toHaveClass('extra-class')
})

test('Button onClick handler is called when clicked', () => {
    const mockOnClick = vi.fn()
    render(<Button title='Click Me' type='button' onClick={mockOnClick} />)

    const buttonElement = screen.getByRole('button', { name: 'Click Me' })
    fireEvent.click(buttonElement)

    expect(mockOnClick).toHaveBeenCalled()
})

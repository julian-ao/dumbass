import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { test } from 'vitest'
import Breadcrumb from '../../components/atoms/Breadcrumb'

test('Test that the Breadcrumb component renders breadcrumb items', () => {
    const breadcrumbItems = [
        { name: 'Category', link: '/category' },
        { name: 'Item' }
    ]

    render(
        <MemoryRouter>
            <Breadcrumb items={breadcrumbItems} />
        </MemoryRouter>
    )

    // Check if all breadcrumb items are rendered
    breadcrumbItems.forEach((item) => {
        const element = screen.getByText(item.name)
        expect(element).toBeInTheDocument()
        if (item.link) {
            expect(element.closest('a')).toHaveAttribute('href', item.link)
        }
    })

    // Check if the '/' separators are present
    const separators = screen.getAllByText('/')
    expect(separators).toHaveLength(breadcrumbItems.length)
})

test('Test that the Breadcrumb component shows a loading skeleton when isLoading is true', () => {
    render(
        <MemoryRouter>
            <Breadcrumb isLoading={true} items={[]} />
        </MemoryRouter>
    )

    // Check for loading skeleton
    const loadingSkeleton = screen.getByRole('status')
    expect(loadingSkeleton).toBeInTheDocument()
})

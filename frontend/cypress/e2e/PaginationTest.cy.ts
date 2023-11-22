import { frontendBaseUri } from '../baseUrl'

describe('Pagination test', () => {
    it('Go to search page and search for m, check that pagination button work correct', () => {
        // Visit the search page
        cy.visit(
            frontendBaseUri + '/project2/search?filter=song&sort=relevance'
        )

        // Search for "m"
        cy.get('#searchInput').type('m')
        cy.get('#search-button').click()

        // Click on next pagination 20 times
        for (let i = 0; i < 20; i++) {
            // Check if there is a next page button
            cy.get('#next-pagination-button').should('exist').click()
        }

        // Check if the URL contains "term=m"
        cy.url().should('include', 'term=m')

        // Check that there are 12 results
        cy.get('article').should('have.length', 12)

        // Click on previous pagination 10 times
        for (let i = 0; i < 10; i++) {
            // Check if there is a next page button
            cy.get('#previous-pagination-button').should('exist').click()
        }
        //
        // Check if the URL contains "term=m"
        cy.url().should('include', 'term=m')
        //
        // Check the 5th result
        cy.get('article').should('have.length', 12)
    })
})

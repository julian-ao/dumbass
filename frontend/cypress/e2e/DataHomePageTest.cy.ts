import { frontendBaseUri } from '../baseUrl'

describe('Navigation to Song and Artist pages from Home page', () => {
    it('updates URL correctly when clicking on the first song', () => {
        // Visit the homepage
        cy.visit(frontendBaseUri + '/project2/')

        // Click on the first song
        cy.get('article').first().find('h2').click()

        // Check if the URL includes '/song/'
        cy.url().should('include', '/song/')
    })

    it('updates URL correctly when clicking on the first artist', () => {
        // Visit the homepage
        cy.visit(frontendBaseUri + '/project2/')

        // Click on the first artist
        cy.get('article').eq(13).click()

        // Check if the URL includes '/artist/'
        cy.url().should('include', '/artist/')
    })
})

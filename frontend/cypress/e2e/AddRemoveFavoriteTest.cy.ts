import { frontendBaseUri } from '../baseUrl'

describe('Add and remove favorite for a logged in user', () => {
    it('logs in, add two songs to favorties, checks that the order is correct, removes both and check that no data is found', () => {
        // Visit the login page
        cy.visit(frontendBaseUri + '/project2/login/')

        // Log in with username "hei" and password "123"
        cy.get('#username').type('hei')
        cy.get('#password').type('123')
        cy.get('form').submit()

        // Click on the second song
        const firstSelectedSong = cy.get('article').eq(1).find('h2')
        firstSelectedSong.click()
        // Add to favorites
        cy.get('#add-favorite-button').click()
        cy.contains('Added to favorites').should('be.visible')

        //Go back to homepage
        cy.get('#breadcrumb-link-home').click()

        // Click on the first song
        const secondSelectedSong = cy.get('article').first().find('h2')
        secondSelectedSong.click()
        // Add to favorites
        cy.get('#add-favorite-button').click()
        cy.contains('Added to favorites').should('be.visible')

        // Visit the favorites page and check that the first song is the one added first
        cy.get('#nav-Favorites').click()
        firstSelectedSong.invoke('text').then((text) => {
            cy.get('article').first().find('h2').should('contain', text)
        })
        cy.get('article').first().click()

        // Remove the first song in favorite
        cy.get('#add-favorite-button').click()
        cy.contains('Removed from favorites').should('be.visible')

        // Go back to favorites page
        cy.get('#breadcrumb-link-1').click()

        // Check that the first song now is the one added second
        secondSelectedSong.invoke('text').then((text) => {
            cy.get('article').first().find('h2').should('contain', text)
        })
        // Remove the second song in favorite
        cy.get('article').first().click()
        cy.get('#add-favorite-button').click()
        cy.contains('Removed from favorites').should('be.visible')
        cy.get('#breadcrumb-link-1').click()

        // Check that the favorites page is empty
        cy.contains('You have no favorite songs...').should('be.visible')

        // Sign out user
        cy.get('#user-menu-button').click()
        cy.get('#sign-out-button').click()
        cy.contains(
            'h1',
            'You need to be logged in to add favorites...'
        ).should('be.visible')
    })

    it('check that favoirte button is removed when not logged in', () => {
        // Visit the homepage
        cy.visit(frontendBaseUri + '/project2/')

        // Click on the first song and try to add to favorites
        cy.get('article').first().click()
        cy.get('#add-favorite-button').should('not.exist')

        // Go to the favorites page and check that it is not possible to add favorites
        cy.get('#nav-Favorites').click()
        cy.contains(
            'h1',
            'You need to be logged in to add favorites...'
        ).should('be.visible')
    })
})

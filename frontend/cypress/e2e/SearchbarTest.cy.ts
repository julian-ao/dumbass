describe('Searchbar dropdown test', () => {
    it('Test that the correct songs is shown in the dropdown with filter "song"', () => {
        cy.visit(
            'http://localhost:5173/project2/search?filter=song&sort=relevance'
        )

        // Search for "All" and check that the 5th result is "All I Do Is Win"
        cy.get('#searchInput').type('All')

        // Add wait to make sure the dropdown is loaded
        cy.wait(500)
        cy.get('#dropdown-option-5').click()
        cy.url().should('include', '/song/732')

        cy.visit(
            'http://localhost:5173/project2/search?filter=song&sort=relevance'
        )
        // Search for "Moment" and check that the 2th result is "Moment of Truth"
        cy.get('#searchInput').type('Moment')

        // Add wait to make sure the dropdown is loaded
        cy.wait(500)
        cy.get('#dropdown-option-2').click()
        cy.url().should('include', '/song/980')
    })

    it('Test that the correct artist is shown in the dropdown with filter "artist"', () => {
        cy.visit(
            'http://localhost:5173/project2/search?filter=song&sort=relevance'
        )

        // Search for "Jay" and check that the 1th result is "Jay-Z"
        cy.get('#filter-button').click()
        cy.contains('button', 'Artist').click()

        cy.get('#searchInput').type('Jay')

        // Add wait to make sure the dropdown is loaded
        cy.wait(500)
        cy.get('#dropdown-option-1').click()
        cy.url().should('include', '/artist/2')

        cy.visit(
            'http://localhost:5173/project2/search?filter=song&sort=relevance'
        )

        // Search for "The W" and check that the tth result is "Taylor Swift"
        cy.get('#filter-button').click()
        cy.contains('button', 'Artist').click()

        cy.get('#searchInput').type('The W')

        // Add wait to make sure the dropdown is loaded
        cy.wait(500)
        cy.get('#dropdown-option-3').click()
        cy.url().should('include', '/artist/2358')
    })
})

describe('Searchbar result test', () => {
    it('Test that correct results show up when searching on a searchterm', () => {
        cy.visit(
            'http://localhost:5173/project2/search?filter=song&sort=relevance'
        )

        // "
        cy.get('#searchInput').type('Mo')
        cy.get('#search-button').click()
        cy.url().should('include', 'term=mo')

        // Check that the results start with "Mo"
        cy.get('article').each(($article, index) => {
            if (index < 12) {
                cy.wrap($article)
                    .find('h2')
                    .invoke('text')
                    .should('include', 'Mo')
            }
        })

        for (let i = 0; i < 5; i++) {
            cy.get('#next-pagination-button').click()
        }
        // Check that the results start with "Mo" after pagination
        cy.get('article').each(($article, index) => {
            if (index < 12) {
                cy.wrap($article)
                    .find('h2')
                    .invoke('text')
                    .should('include', 'Mo')
            }
        })
    })
})

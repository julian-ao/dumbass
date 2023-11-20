describe('Pagination test', () => {
    it('Go to search page and search for m, check that pagination button work correct', () => {
        // Visit the search page
        cy.visit('http://localhost:5173/project2/search?filter=song&sort=relevance');

        // Search for "m"
        cy.get('#searchInput').type('m');
        cy.get('#search-button').click();

        // Click on next pagination 20 times
        for (let i = 0; i < 20; i++) {
        // Check if there is a next page button
            cy.get('#next-pagination-button').should('exist').click();
        }

        // Check if the URL contains "term=m"
        cy.url().should('include', 'term=m');

        // Check the first result
        cy.get('article').first().find('h2').should('contain', 'Make You Feel That Way');

        // Click on previous pagination 10 times
        for (let i = 0; i < 10; i++) {
            // Check if there is a next page button
                cy.get('#previous-pagination-button').should('exist').click();
            }

        // Check if the URL contains "term=m"
        cy.url().should('include', 'term=m');

        // Check the 5th result
        cy.get('article').eq(4).find('h2').should('contain', 'My Time');
    });
});
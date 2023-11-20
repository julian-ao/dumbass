describe('Searchbar test', () => {
    it('Test the searchbar with its sort functionality', () => {
        cy.visit('http://localhost:5173/project2/search?filter=song&sort=relevance');
        cy.get('#searchInput').type('Jay-Z');
        cy.get('#search-button').click();
    })
})